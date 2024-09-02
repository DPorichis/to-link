from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.models import Profile, Dm, Convo
from api.serializers import DMSerializer, ConvoSerializer
from django.db.models import F, Q

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_dms_of_convo(request):
    # Retrieve post ID from the request data
    convo_id = request.data.get('convo')
    user=request.user

    # Validate input data
    if not convo_id:
        return Response({"error": "Convo_id is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)


    # Check if the account is authorized to see
    conv =  Convo.objects.get(convo_id=convo_id)
    if conv.user_id1 != profile and conv.user_id2 != profile:
        return Response({"message": "You are not authorized to view this convo"}, status=status.HTTP_400_BAD_REQUEST)
      

    try:
        # Retrieve all comments for the post
        dms = Dm.objects.filter(convo_id=convo_id).order_by('timestamp')
        
        # Serialize the comments
        serializer = DMSerializer(dms, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Dm.DoesNotExist:
        return Response({"error": "Dms not found."}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_dm(request):

    user=request.user
    convo_id = request.data.get("convo")
    # Attempt to get the profile associated with the authenticated user
    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the account is authorized to send that message
    conv =  Convo.objects.get(convo_id=convo_id)
    if conv.user_id1 != profile and conv.user_id2 != profile:
        return Response({"message": "You are not authorized to sent this message"}, status=status.HTTP_400_BAD_REQUEST)
        


    serializer = DMSerializer(data=request.data)

    # Validate the serializer data
    if serializer.is_valid():
        # Save the serializer to create a new post with the uploaded file
        dm = serializer.save(user=profile)
        return Response(DMSerializer(dm).data, status=status.HTTP_201_CREATED)
    else:
        # Return an error response if the data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Requires authentication
def fetch_convo_menu(request):

    # Check if the like already exists
    user = request.user.profile
    try:
        convos = Convo.objects.filter(Q(user_id1=user) | Q(user_id2=user)).order_by('-timestamp')
        # Serialize the comments
        serializer = ConvoSerializer(convos, many=True, context={'authenticated_user': user})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Convo.DoesNotExist:
        return Response({}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retrive_convo(request):
    # Check if the like already exists
    user = request.user.profile
    other_user = request.data.get('other_user')
    
    convos = Convo.objects.filter(Q(user_id1=user, user_id2=other_user) | Q(user_id2=user, user_id1=other_user))


    if convos.exists():
        serializer = ConvoSerializer(convos.first(), context={'authenticated_user': user})
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Convo not found."}, status=status.HTTP_404_NOT_FOUND)
