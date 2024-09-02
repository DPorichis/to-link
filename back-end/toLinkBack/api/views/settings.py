from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status
from rest_framework.authtoken.models import Token

from api.serializers import UserSerializer, ProfileUpdateSerializer
from django.contrib.auth.hashers import check_password
from api.models import User, Profile

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def updateuser(request):
    return Response({})