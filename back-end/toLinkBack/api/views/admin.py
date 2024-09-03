from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.models import Profile, Link
from api.serializers import LinkSerializer
from django.db.models import Q

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_connections(request):
    # Get the user ID from the request data
    user_id = request.data.get('user_id')

    if not user_id:
        return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_profile = Profile.objects.get(user_id=user_id)
    except Profile.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    links = Link.objects.filter(Q(user_id_to=user_id) | Q(user_id_from=user_id))

    # Check if any links are found
    if links.exists():
        serializer = LinkSerializer(links, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Links not found."}, status=status.HTTP_404_NOT_FOUND)


