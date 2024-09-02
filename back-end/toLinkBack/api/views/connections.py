from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.models import Request, Profile,Link, Convo
from api.serializers import RequestSerializer,LinkSerializer

from django.db.models import F,Q

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def make_request(request):

    user_id_from = request.user.profile
    user_id_to = request.data.get('request_id')

    if not user_id_to:
        return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user_id_to = Profile.objects.get(user_id=user_id_to)
    except Profile.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    print(user_id_from)
    print(user_id_to)
    
    if Link.objects.filter(Q(user_id_to=user_id_from, user_id_from=user_id_to) | Q(user_id_to=user_id_to, user_id_from=user_id_from)).exists():
        return Response({"error": "You are already friends with this user."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        request = Request.objects.get(user_id_to=user_id_to, user_id_from=user_id_from)
        request.delete()
        return Response({"message": "Request deleted successfully."}, status=status.HTTP_200_OK)
    except Request.DoesNotExist:
        Request.objects.create(user_id_from=user_id_from,user_id_to=user_id_to)
        return Response({"message": "Request made successfully."}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def response_request(request):
    
    user_id_to = request.user.profile
    user_id_from = request.data.get('request_id')
    response = request.data.get('request_response')


    if not user_id_from:
        return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user_req = Profile.objects.get(user_id=user_id_from)
    except Profile.DoesNotExist:
        return Response({"error": "User id not found."}, status=status.HTTP_404_NOT_FOUND)
    
    print(user_req)
    print(user_id_to)
    try:
        request = Request.objects.get(user_id_from=user_req, user_id_to=user_id_to)
    except Request.DoesNotExist:
        return Response({"error": "Request doesn't exist."}, status=status.HTTP_400_BAD_REQUEST)
    
    if response == "accept":
        Link.objects.create(user_id_from=user_req, user_id_to=user_id_to)
        Convo.objects.create(user_id1=user_req, user_id2=user_id_to)
        request.delete()
        return Response({"message": "Request accepted successfully."})
    else:
        request.delete()
        return Response({"message": "Request declined successfully."})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_request(request):

    user_id_to = request.user.profile
    
    try:
        requests = Request.objects.filter(user_id_to=user_id_to)
        serializer = RequestSerializer(requests, many= True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Request.DoesNotExist:
        return Response({"error": "Request not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])    
def fetch_connections(request):

    user_profile = request.user.profile
    
    links = Link.objects.filter(Q(user_id_to=user_profile) | Q(user_id_from=user_profile))
    

    print(links)

    # Check if any links are found
    if links.exists():
        serializer = LinkSerializer(links, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Links not found."}, status=status.HTTP_404_NOT_FOUND)




        


    

    

    

    






    