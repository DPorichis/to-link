# notifications.py
# This module contains API views for profiles.
# Through these APIs, users can update and delete their profile.
##################################################################################

from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status
from rest_framework.authtoken.models import Token

from api.serializers import ProfileSerializer, ProfileUpdateSerializer, ProfileHeaderSerializer
from django.contrib.auth.hashers import check_password
from api.models import User, Profile

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


# Updating profile information
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    
    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProfileUpdateSerializer(profile, data=request.data, partial=True)
    print(request.data)
    if serializer.is_valid():
        # Save the updated profile information
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # Return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrive profile of authenticated User
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retrive_own_profile(request):
    user = request.user
    
    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProfileSerializer(profile, context={'authenticated_user': user})
    return Response(serializer.data, status=status.HTTP_200_OK)

# Retrive profile of user specified in user_id
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retrive_profile(request):
    user = request.user
    user_target = request.data.get('user_id')
    
    try:
        profile = Profile.objects.get(user_id=user_target)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProfileSerializer(profile,  context={'authenticated_user': user})
    return Response(serializer.data, status=status.HTTP_200_OK)

# Retrive information for header, (notification badges)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retrive_header_info(request):
    user = request.user

    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProfileHeaderSerializer(profile)
    return Response(serializer.data, status=status.HTTP_200_OK)

