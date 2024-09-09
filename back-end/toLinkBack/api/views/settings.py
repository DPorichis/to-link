from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status
from rest_framework.authtoken.models import Token

from api.serializers import UserSerializer, ProfileUpdateSerializer
from django.contrib.auth.hashers import check_password
from api.models import User, Profile

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    # Get the authenticated user
    user = request.user
    
    # Create the serializer with the current profile and the request data
    serializer = UserSerializer(user, data=request.data, partial=True)  # `partial=True` to allow for partial updates
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
def fetch_user_info(request):
    user = request.user
    
    if user is not None:
        # Save the updated profile information
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # Invalid credentials
        return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED) 


    return Response({})


