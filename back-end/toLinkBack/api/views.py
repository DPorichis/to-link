from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer, ProfileUpdateSerializer
from django.contrib.auth.hashers import check_password
from .models import User, Profile

from django.contrib.auth import authenticate, login as django_login, logout as django_logout

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Validate input data
    if not email or not password:
        return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Authenticate the user
    user = authenticate(email=email, password=password)

    if user is not None:
        # Log in the user by creating a session
        django_login(request, user)

        # Retrieve and serialize user data
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # Invalid credentials
        return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)    


@api_view(['POST'])
def signup(request):
    user_serializer = UserSerializer(data=request.data)
    if user_serializer.is_valid():
        user = user_serializer.save()

        # Create a corresponding profile for the new user
        Profile.objects.create(
            user_id=user.user_id,  # Link the profile to the new user
            name=user.name,
            surname=user.surname,
            email=user.email
        )

        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    else:
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)    



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

    if serializer.is_valid():
        # Save the updated profile information
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # Return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def logout(request):
    django_logout(request)
    return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)