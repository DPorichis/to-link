# views.py
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.recommendations import listing_recom, post_recom


@api_view(['POST'])
def get_interactions(request):
    # listing_recom()
    post_recom()
    return Response({}, status=status.HTTP_200_OK)