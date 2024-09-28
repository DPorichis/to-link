#dms.py
# This module contains API views for dms.
# Through these APIs, users can send and fetch dms
##################################################################################


from rest_framework.pagination import PageNumberPagination 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.models import Profile, Dm, Convo
from api.serializers import DMSerializer, ConvoSerializer
from django.db.models import F, Q
from django.utils import timezone


class CustomPagination(PageNumberPagination):
    page_size = 20  


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_dms_of_convo(request):
    # Retrieve post ID from the request data
    convo_id = request.data.get('convo')
    user = request.user

    # Validate input data
    if not convo_id:
        return Response({"error": "Convo_id is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the account is authorized to view the convo
    try:
        conv = Convo.objects.get(convo_id=convo_id)
    except Convo.DoesNotExist:
        return Response({"error": "Convo not found."}, status=status.HTTP_404_NOT_FOUND)

    if conv.user_id1 != profile and conv.user_id2 != profile:
        return Response({"message": "You are not authorized to view this convo"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Fetch and order the DMs (direct messages) by timestamp
        dms = Dm.objects.filter(convo_id=convo_id).order_by('-timestamp')

        # Use the paginator to paginate the DMs
        paginator = CustomPagination()
        paginated_dms = paginator.paginate_queryset(dms, request)
        serializer = DMSerializer(paginated_dms, many=True)

        if conv.user_id1 == profile:
            conv.user_id1_last = timezone.now()
        else:
            conv.user_id2_last = timezone.now()
        conv.save()

        return paginator.get_paginated_response(serializer.data)

    except Dm.DoesNotExist:
        return Response({"error": "Dms not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_dm(request):

    user=request.user
    convo_id = request.data.get("convo")
    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

    conv =  Convo.objects.get(convo_id=convo_id)
    if conv.user_id1 != profile and conv.user_id2 != profile:
        return Response({"message": "You are not authorized to sent this message"}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = DMSerializer(data=request.data)

    if serializer.is_valid():
        dm = serializer.save(user=profile)
        conv.timestamp = timezone.now()
        if conv.user_id1 == profile:
            conv.user_id1_last = timezone.now()
            conv.last_dm = 1
        else:
            conv.user_id2_last = timezone.now()
            conv.last_dm = 2
            
        conv.save()
        return Response(DMSerializer(dm).data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def fetch_convo_menu(request):

    # Check if the like already exists
    user = request.user.profile
    try:
        convos = Convo.objects.filter(Q(user_id1=user) | Q(user_id2=user)).order_by('-timestamp')
        serializer = ConvoSerializer(convos, many=True, context={'authenticated_user': user})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Convo.DoesNotExist:
        return Response({}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retrive_convo(request):
    user = request.user.profile
    other_user = request.data.get('other_user')
    
    convos = Convo.objects.filter(Q(user_id1=user, user_id2=other_user) | Q(user_id2=user, user_id1=other_user))


    if convos.exists():
        serializer = ConvoSerializer(convos.first(), context={'authenticated_user': user})
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Convo not found."}, status=status.HTTP_404_NOT_FOUND)
