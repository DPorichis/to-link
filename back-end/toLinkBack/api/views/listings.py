from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status
from rest_framework.authtoken.models import Token

from api.serializers import ListingSerializer, ListingUpdateSerializer, AppliedSerializer
from api.models import Listing, Applied, Profile, Link, Notification

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.db.models import F, Q

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_listing(request):
    # Get the authenticated user
    user = request.user.profile
    target_listing = request.data.get('listing_id') 

    
    # Attempt to get the profile associated with the authenticated user
    try:
        listing = Listing.objects.get(user_id=user, listing_id=target_listing)
    except Listing.DoesNotExist:
        return Response({"error": "Listing does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    # Create the serializer with the current profile and the request data
    serializer = ListingUpdateSerializer(listing, data=request.data, partial=True)  # `partial=True` to allow for partial updates

    if serializer.is_valid():
        # Save the updated profile information
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # Return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_applied_by_listing_id(request):
    # Get the authenticated user
    user = request.user.profile
    target_listing = request.data.get('listing_id') 

    # Attempt to get the profile associated with the authenticated user
    try:
        listing = Listing.objects.get(listing_id=target_listing, user=user)
    except Listing.DoesNotExist:
        return Response({"error": "Listing does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        applications = Applied.objects.filter(listing=listing)
        serializer = AppliedSerializer(applications, many=True, context={'authenticated_user': user})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Applied.DoesNotExist:
        return Response({}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_by_id(request):
    # Get the authenticated user
    user = request.user.profile
    target_listing = request.data.get('listing_id') 

    # Attempt to get the profile associated with the authenticated user
    try:
        listing = Listing.objects.get(listing_id=target_listing)
    except Listing.DoesNotExist:
        return Response({"error": "Listing does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    if listing.user == user:
        return Response({"error": "You can't apply to your own job"}, status=status.HTTP_404_NOT_FOUND)
    # Check if the like already exists
    user = request.user.profile
    try:
        applied_by = Applied.objects.get(listing=listing, user=user)
        # If exists, unlike the post
        applied_by.delete()
        listing.apl_cnt = F('apl_cnt') - 1
        listing.save(update_fields=['apl_cnt'])
        return Response({"applied": False}, status=status.HTTP_200_OK)
    except Applied.DoesNotExist:
        # If not exists, like the post
        application = Applied.objects.create(listing=listing, user=user)
        listing.apl_cnt = F('apl_cnt') + 1
        listing.save(update_fields=['apl_cnt'])
        profile = Profile.objects.get(user_id=listing.user)
        Notification.objects.create(application=application, user_from=user, user_to=profile, type="application")
        return Response({"applied": True}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_if_applied(request):
    # Get the authenticated user
    user = request.user.profile
    target_listing = request.data.get('listing_id') 

    # Attempt to get the profile associated with the authenticated user
    try:
        listing = Listing.objects.get(listing_id=target_listing)
    except Listing.DoesNotExist:
        return Response({"error": "Listing does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    if listing.user == user:
        return Response({"applied": "You can't apply to your own job"}, status=status.HTTP_200_OK)
    # Check if the like already exists
    user = request.user.profile
    try:
        applied_by = Applied.objects.get(listing=listing, user=user)
        # If exists, unlike the post
        return Response({"applied": "allowed"}, status=status.HTTP_200_OK)
    except Applied.DoesNotExist:
        return Response({"applied": "applied"}, status=status.HTTP_200_OK)




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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def show_listings(request):
    # Get the authenticated user
    user = request.user.profile
    target_user = request.data.get('specify_user')
    print(target_user)
    
    if target_user == "own":
        target_user = user
    elif target_user is not None:
        try:
            target_user = Profile.objects.get(user_id=target_user)
        except Profile.DoesNotExist:
            return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
    if target_user is None:
        listings = Listing.objects.filter(visible='1')
    else:
        listings = Listing.objects.filter(user=target_user)
    if listings.exists():
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response([], status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_listing_by_id(request):
    # Get the authenticated user
    user = request.user.profile
    listing_target = request.data.get('listing_id')
    
    listing = Listing.objects.get(listing_id=listing_target)

    if listing.exists():
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

    return Response({"message": "this listing doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
