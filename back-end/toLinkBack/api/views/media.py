# dms.py
# This module contains API views for media.
# Through these APIs, users can upload a picture and fetch pictures
##################################################################################

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.models import Media, Convo
from api.serializers import MediaSerializer

# Upload a picture
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_picture(request):
    # Ensure that a file has been uploaded
    if 'image' not in request.FILES:
        return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)

    user = request.user.profile
    image = request.FILES['image']
    convo = request.data.get("convo_id")

    # Create a new picture instance
    picture = Media(user=user, image=image, convo=convo)
    picture.save()

    serializer = MediaSerializer(picture)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

# Fetching pictures
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_pictures(request):
    user = request.user
    media_id = request.data.get("media_id")
    picture = Media.objects.get(media_id=media_id)

    if picture.convo is not None:
        convo = Convo.object.get(convo_id=picture.convo)
        if convo.user_id1!=user and convo.user_id2!=user:
            return Response({"error": "Unauthorized access"}, status=status.HTTP_400_BAD_REQUEST)
    serializer = MediaSerializer(picture)
    return Response(serializer.data, status=status.HTTP_200_OK)