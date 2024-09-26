from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status
from rest_framework.authtoken.models import Token

from api.serializers import ProfileSerializer, ProfileUpdateSerializer, ProfileHeaderSerializer
from django.contrib.auth.hashers import check_password
from api.models import User, Profile

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def updateuser(request):
    return Response({})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    # Get the authenticated user
    user = request.user
    
    # Attempt to get the profile associated with the authenticated user
    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    # Create the serializer with the current profile and the request data
    serializer = ProfileUpdateSerializer(profile, data=request.data, partial=True)  # `partial=True` to allow for partial updates
    print(request.data)
    if serializer.is_valid():
        # Save the updated profile information
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # Return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retrive_own_profile(request):
    # Get the authenticated user
    user = request.user
    
    # Attempt to get the profile associated with the authenticated user
    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProfileSerializer(profile, context={'authenticated_user': user})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retrive_profile(request):
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retrive_header_info(request):
    # Get the authenticated user
    user = request.user

    # Attempt to get the profile associated with the authenticated user
    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProfileHeaderSerializer(profile)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_profile(request):
    user = request.user
    print(f"Attempting to delete profile for user: {user}")

    try:
        profile = Profile.objects.get(user=user)
        profile.post_set.all().delete()
        profile.delete()
        return Response({"message": "Profile and associated user deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)