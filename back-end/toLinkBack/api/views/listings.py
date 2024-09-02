from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status
from rest_framework.authtoken.models import Token

from api.serializers import ProfileSerializer, ProfileUpdateSerializer
from api.models import Listing, Applied, Profile

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_listing(request):
    # Get the authenticated user
    user = request.user
    
    # Attempt to get the profile associated with the authenticated user
    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    # Create the serializer with the current profile and the request data
    serializer = ProfileUpdateSerializer(profile, data=request.data, partial=True)  # `partial=True` to allow for partial updates

    if serializer.is_valid():
        # Save the updated profile information
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # Return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_listing_by_id(request):
    # Get the authenticated user
    user = request.user
    target_listing = request.data.get('listing_id') 

    # Attempt to get the profile associated with the authenticated user
    try:
        listing = Listing.objects.get(listing_id=target_listing)
    except Profile.DoesNotExist:
        return Response({"error": "Listing does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ListingSerializer(context={'authenticated_user': user})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_listing(request):
    # Get the authenticated user
    user = request.user
    
    # Attempt to get the profile associated with the authenticated user
    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ListingSerializer(user=profile, )
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def show_listings(request):
    # Get the authenticated user
    user = request.user
    user_target = request.data.get('user_id')
    
    # Attempt to get the profile associated with the authenticated user
    try:
        profile = Profile.objects.get(user_id=user_target)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProfileSerializer(profile,  context={'authenticated_user': user})
    return Response(serializer.data, status=status.HTTP_200_OK)
