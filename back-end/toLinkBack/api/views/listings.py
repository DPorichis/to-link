# listings.py
# This module contains API views for listings.
# Through these APIs, users can update, apply for, fetch, and create listings.
# Additionally, users can see who has applied to their listings.
##################################################################################

from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status
from rest_framework.authtoken.models import Token

from api.serializers import ListingSerializer, ListingUpdateSerializer, AppliedSerializer
from api.models import Listing, Applied, Profile, Link, Notification, ListingViews, ListingRecom

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.db.models import F, Q

from rest_framework.pagination import PageNumberPagination

class ListingPagination(PageNumberPagination):
    page_size = 15

# Updates a listing
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_listing(request):
    user = request.user.profile
    target_listing = request.data.get('listing_id') 

    try:
        # the owner must be the authenticated user
        listing = Listing.objects.get(user_id=user, listing_id=target_listing)
    except Listing.DoesNotExist:
        return Response({"error": "Listing does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ListingUpdateSerializer(listing, data=request.data, partial=True)
    if serializer.is_valid():
        # Save the updated listing information
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # Return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Getting all the users who applied for the job
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_applied_by_listing_id(request):
    user = request.user.profile
    target_listing = request.data.get('listing_id') 

    try:
        # the owner must be the authenticated user
        listing = Listing.objects.get(listing_id=target_listing, user=user)
    except Listing.DoesNotExist:
        return Response({"error": "Listing does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        applications = Applied.objects.filter(listing=listing)
        serializer = AppliedSerializer(applications, many=True, context={'authenticated_user': user})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Applied.DoesNotExist:
        return Response({}, status=status.HTTP_200_OK)

# User applies for a job
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_by_id(request):
    user = request.user.profile
    target_listing = request.data.get('listing_id') 

    try:
        listing = Listing.objects.get(listing_id=target_listing)
    except Listing.DoesNotExist:
        return Response({"error": "Listing does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    # owner cannot apply to listing
    if listing.user == user:
        return Response({"error": "You can't apply to your own job"}, status=status.HTTP_404_NOT_FOUND)
    
    user = request.user.profile
    try:
        applied_by = Applied.objects.get(listing=listing, user=user)
        # If exists, revoke application
        applied_by.delete()
        listing.apl_cnt = F('apl_cnt') - 1
        listing.save(update_fields=['apl_cnt'])
        return Response({"applied": False}, status=status.HTTP_200_OK)
    except Applied.DoesNotExist:
        # If not exists, create application
        application = Applied.objects.create(listing=listing, user=user)
        listing.apl_cnt = F('apl_cnt') + 1
        listing.save(update_fields=['apl_cnt'])
        profile = Profile.objects.get(user_id=listing.user)
        Notification.objects.create(application=application, user_from=user, user_to=profile, type="application")
        return Response({"applied": True}, status=status.HTTP_200_OK)
    
# Checking if a user applied for a job
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_if_applied(request):
    
    user = request.user.profile
    target_listing = request.data.get('listing_id') 

    try:
        listing = Listing.objects.get(listing_id=target_listing)
    except Listing.DoesNotExist:
        return Response({"error": "Listing does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    if listing.user == user:
        return Response({"applied": "You can't apply to your own job"}, status=status.HTTP_200_OK)
    
    ### Check if applied is only called upon viewing, track user activity
    ListingViews.objects.create(user=user, listing=listing)
    
    try:
        applied_by = Applied.objects.get(listing=listing, user=user)
        # If exists, unlike the post
        return Response({"applied": "applied"}, status=status.HTTP_200_OK)
    except Applied.DoesNotExist:
        return Response({"applied": "allowed"}, status=status.HTTP_200_OK)



# Upload a listing
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_listing(request):
    serializer = ListingSerializer(data=request.data)

    user = request.user
    
    # Attempt to get the profile associated with the authenticated user
    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

    # Validate the serializer data
    if serializer.is_valid():
        # Save the serializer to create a new post with the uploaded file
        listing = serializer.save(user=profile)
        profile.listings_cnt = F('listings_cnt') + 1
        profile.save(update_fields=['listings_cnt'])
        return Response(ListingSerializer(listing).data, status=status.HTTP_201_CREATED)
    else:
        # Return an error response if the data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Fetches the personalized list of listings for each user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def show_listings(request):
    # Get the authenticated user
    user = request.user.profile
    target_user = request.data.get('specify_user')
    print(target_user)
        
    if target_user is None:
        # Public listings
        publiclistings = Listing.objects.filter(Q(visible='1'))

        # Network listings
        allowedlistings = Listing.objects.filter(
            Q(visible='2') & (
                Q(user_id__in=Link.objects.filter(user_id_from=user).values('user_id_to')) |
                Q(user_id__in=Link.objects.filter(user_id_to=user).values('user_id_from'))
            )
        )
        # Combine public listings and allowed network listings
        listings = publiclistings | allowedlistings  # Combine QuerySets
    
    
        # Listings now contains ONLY LISTINGS THAT ARE ALLOWED TO BE SEEN

        # Priority based on three factors
        # For same network: + 1
        # For listing inside matrix Fact. recommendatinos: + 1
        # For listing with same skills: + 1

        links = list(Link.objects.filter(user_id_to=user).values_list('user_id_from', flat=True)) + \
        list(Link.objects.filter(user_id_from=user).values_list('user_id_to', flat=True)) + [request.user.user_id]
    
        networkListings = listings.filter(user__in=links)

        recommended = ListingRecom.objects.filter(user=user)
        recommendedListings = listings.filter(listing_id__in=recommended)

        if user.skills:
            # listings where the skills match any of the profile's skills
            skillListings = Listing.objects.filter(
                Q(skills__overlap=user.skills)
            ).distinct()            
        else:
            skillListings = []

        prioritized_listings = []
        
        # Assign priority based on the three factors
        for listing in listings:
            priority = 0

            if listing in networkListings:
                priority += 1
            if listing in recommendedListings:
                priority += 1
            if listing in skillListings:
                priority += 1

            prioritized_listings.append({
                'listing': listing,
                'priority': priority
            })

        prioritized_listings.sort(key=lambda x: x['priority'], reverse=True)
        listings = [item['listing'] for item in prioritized_listings]    

    
    elif target_user == "own":
        # For own user, only return his own listings
        listings = Listing.objects.filter(user=user).order_by('-timestamp')
    
    else:
        # For specific user, only return his listings
        try:
            target_user = Profile.objects.get(user_id=target_user)
        except Profile.DoesNotExist:
            return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
        listings = Listing.objects.filter(user=target_user, visible='1')
        
        if Link.objects.filter(user_id_to=target_user, user_id_from=user).exists() or \
        Link.objects.filter(user_id_to=user, user_id_from=target_user).exists():
            allowedlistings = Listing.objects.filter(user=target_user, visible='2')
            listings = listings | allowedlistings

    paginator = ListingPagination()
    paginated_listings = paginator.paginate_queryset(listings, request)
    serializer = ListingSerializer(paginated_listings, many=True)

    # Return the paginated response
    return paginator.get_paginated_response(serializer.data)

# Fetching a listing by the id
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_listing_by_id(request):
    # Get the authenticated user
    user = request.user.profile
    listing_target = request.data.get('listing_id')
    
    try:
        listing = Listing.objects.get(listing_id=listing_target)
        vis = listing.visible
        if listing.user == user:
            vis = 3
        elif Link.objects.filter(Q(user_id_to=user, user_id_from=listing.user) | Q(user_id_to=listing.user, user_id_from=user)).exists():
            vis = 2
        else:
            vis = 1
        if (listing.visible <= vis):
            return Response(ListingSerializer(listing).data, status=status.HTTP_200_OK)
        else:
            return Response({"message":"You cannot see this listing because of the privacy settings set by the user"}, status=status.HTTP_400_BAD_REQUEST)
    except Listing.DoesNotExist:
        return Response({"message": "Listing not found."}, status=status.HTTP_404_NOT_FOUND)
    
