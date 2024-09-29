from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status
from rest_framework.authtoken.models import Token

from api.serializers import UserSerializer, ProfileUpdateSerializer
from django.contrib.auth.hashers import check_password
from api.models import User, Profile

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# Updating User information
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    
    serializer = UserSerializer(user, data=request.data, partial=True, allow_null=True)  # `partial=True` to allow for partial updates
    print(request.data)
    if serializer.is_valid():
        # Save the updated profile information
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # Return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retriving User information (of the authenticated user)
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

# Delete the authenticated user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_profile(request):
    user = request.user
    print(f"Attempting to delete profile for user: {user}")

    try:
        user.delete()
        return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
