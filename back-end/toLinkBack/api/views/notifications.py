# notifications.py
# This module contains API views for notifications.
# Through these APIs, users can fetch notifications and dismiss them.
##################################################################################

from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import status
from rest_framework.authtoken.models import Token

from api.serializers import NotificationSerializer
from api.models import Profile, Notification

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.db.models import F, Q

# Fetcing all notifications of the authenticated user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_notifications(request):
    user = request.user.profile
    try:
        notifications = Notification.objects.filter(user_to=user)
    except Notification.DoesNotExist:
        return Response([], status=status.HTTP_200_OK)
    
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Dismiss a notification specified by notification_id
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dismiss_notification_by_id(request):
    user = request.user.profile
    target_notification = request.data.get('notification_id')

    try:
        notification = Notification.objects.get(notification_id=target_notification, user_to=user)
        notification.delete()
        return Response({"message": "Notification deleted"}, status=status.HTTP_200_OK)
    except Notification.DoesNotExist:
        return Response({"error": "Notification does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    
    
