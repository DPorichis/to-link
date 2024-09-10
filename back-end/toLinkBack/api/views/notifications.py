from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status
from rest_framework.authtoken.models import Token

from api.serializers import NotificationSerializer
from api.models import Profile, Notification

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.db.models import F, Q

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_notifications(request):
    # Get the authenticated user
    user = request.user.profile
    
    # Attempt to get the profile associated with the authenticated user
    try:
        notifications = Notification.objects.filter(user_to=user)
    except Notification.DoesNotExist:
        return Response([], status=status.HTTP_200_OK)
    
    # Create the serializer with the current profile and the request data
    serializer = NotificationSerializer(notifications, many=True)  # `partial=True` to allow for partial updates
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dismiss_notification_by_id(request):
    # Get the authenticated user
    user = request.user.profile
    target_notification = request.data.get('notification_id')

    # Attempt to get the profile associated with the authenticated user
    try:
        notification = Notification.objects.get(notification_id=target_notification, user_to=user)
        notification.delete()
        return Response({"message": "Notification deleted"}, status=status.HTTP_200_OK)
    except Notification.DoesNotExist:
        return Response({"error": "Notification does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    
    
