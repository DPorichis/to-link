from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.models import Request, Profile,User,Link
from api.serializers import RequestSerializer



@api_view(['POST'])
@permission_classes([IsAuthenticated])

def make_request(request):

    user_id_from = request.user.profile
    user_id_to = request.data.get('request id')

    if not user_id_to:
        return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user_id_to = Profile.objects.get(User.user_id == user_id_to)
    except Profile.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        request = Request.objects.get(user_id_to=user_id_to)
        request.delete()
    except Request.DoesNotExist:
        Request.objects.create(user_id_from=user_id_from,user_id_to=user_id_to)
        return Response({"message": "Request canceled successfully."}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def response_request(request):
    
    user_id_to = request.user.profile
    user_id_from = request.data.get('request_id')
    response = request.data.get('request_response')


    if not user_id_from:
        return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user_req = Profile.objects.get(User.user_id == user_id_from)
    except Profile.DoesNotExist:
        return Response({"error": "User id not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        request = Request.objects.get(user_id_from=user_id_from, user_id_to=user_id_to)
    except Request.DoesNotExist:
        Response({"error": "Request is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    if response == "accept":
        Link.objects.create(user_id_from=user_id_from,user_id_to=user_id_to)
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
    
def fetch_connections(request):

    user_id_to = request.user.profile
    
    try:
        links = Link.objects.filter(user_id_to=user_id_to)
        serializer = RequestSerializer(links, many= True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Request.DoesNotExist:
        return Response({"error": "Link not found."}, status=status.HTTP_404_NOT_FOUND)
    




        


    

    

    

    






    