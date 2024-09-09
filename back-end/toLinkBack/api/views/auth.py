from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status

from api.serializers import UserSerializer
from api.models import User, Profile

from django.contrib.auth.hashers import check_password, make_password
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from rest_framework.decorators import api_view, permission_classes

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

        return Response({"success": "User created successfully"}, status=status.HTTP_201_CREATED)
    else:
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

@api_view(['POST'])
def logout(request):
    django_logout(request)
    return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_user_password(request):
    user = request.user  # Authenticated user
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")

    # Check if current password and new password are provided
    if not current_password or not new_password:
        return Response({"error": "Current password and new password are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Validate current password
    if not check_password(current_password, user.password):
        return Response({"error": "Current password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

    # Update the password and save the user object
    user.password = make_password(new_password)
    user.save()

    # Re-authenticate the user after password change
    user = authenticate(email=user.email, password=new_password)

    # Log the user back in with the new password
    django_login(request, user)

    return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)