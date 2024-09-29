#connections.py
# This module contains API views for connections.
# Through these APIs, users can send,fetch,receive and response friend requests.
#Also users can search for other users 
##################################################################################

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.models import Request, Profile,Link, Convo,User
from api.serializers import RequestSerializer,LinkSerializer,ProfileSerializer,UserSerializer, ProfileBannerSerializer, ConnectionSerializer

from django.db.models import F,Q

from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 4

# Make a friend request
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
    
    # Check corner cases where action is not allowed
    if Link.objects.filter(Q(user_id_to=user_id_from, user_id_from=user_id_to) | Q(user_id_to=user_id_to, user_id_from=user_id_from)).exists():
        return Response({"error": "You are already friends with this user."}, status=status.HTTP_400_BAD_REQUEST)
    
    if Request.objects.filter(user_id_to=user_id_from, user_id_from=user_id_to).exists():
        return Response({"error": "Great minds think alike! This user already wants to connect with you, refresh this page to get the latest information"}, status=status.HTTP_400_BAD_REQUEST) 


    try:
        request = Request.objects.get(user_id_to=user_id_to, user_id_from=user_id_from)
        request.delete()
        return Response({"message": "Request deleted successfully."}, status=status.HTTP_200_OK)
    except Request.DoesNotExist:
        Request.objects.create(user_id_from=user_id_from,user_id_to=user_id_to)
        return Response({"message": "Request made successfully."}, status=status.HTTP_200_OK)
    
# Response a friend request
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
    
    try:
        request = Request.objects.get(user_id_from=user_req, user_id_to=user_id_to)
    except Request.DoesNotExist:
        return Response({"error": "Request doesn't exist."}, status=status.HTTP_400_BAD_REQUEST)
    
    if response == "accept":
        Link.objects.create(user_id_from=user_req, user_id_to=user_id_to)
        Convo.objects.create(user_id1=user_req, user_id2=user_id_to)
        request.delete()

        user_id_to.link_cnt = F('link_cnt') + 1
        user_id_to.save(update_fields=['link_cnt'])

        user_req.link_cnt = F('link_cnt') + 1
        user_req.save(update_fields=['link_cnt'])

        return Response({"message": "Request accepted successfully."})
    else:
        request.delete()
        return Response({"message": "Request declined successfully."})
    
# Fetching user's friend requests    
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

# Fetching user's connections
@api_view(['POST'])
@permission_classes([IsAuthenticated])    
def fetch_connections(request):

    user_profile = request.user.profile
    
    links = Link.objects.filter(Q(user_id_to=user_profile) | Q(user_id_from=user_profile))

    if links.exists():
        serializer = LinkSerializer(links, many=True, context={'authenticated_user': user_profile})
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response([], status=status.HTTP_200_OK)
    
# Fetching other user's connections
@api_view(['POST'])
@permission_classes([IsAuthenticated])    
def fetch_others_connections(request):

    user_profile = request.user.profile
    other_user = request.data.get('other_user')
    
    if other_user == "own":
        user_req = user_profile
    else:
        try:
            user_req = Profile.objects.get(user_id=other_user)
        except Profile.DoesNotExist:
            return Response({"error": "User id not found."}, status=status.HTTP_404_NOT_FOUND)

    if Link.objects.filter(Q(user_id_to=user_profile, user_id_from=user_req) | Q(user_id_to=user_req, user_id_from=user_profile)).exists() \
    or user_profile == user_req:

        links = Link.objects.filter(Q(user_id_to=user_req) | Q(user_id_from=user_req))

        if links.exists():
            serializer = ConnectionSerializer(links, many=True, context={'authenticated_user': user_profile, 'other_user': user_req})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response([], status=status.HTTP_200_OK)

    else:
        return Response({"error": "You are not connected with that user bro"}, status=status.HTTP_404_NOT_FOUND)


# Fetching links that were searched.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_searching_links(request):
    search_term = request.data.get('search', '').strip()
    user_profile = request.user.profile

    links = list(Link.objects.filter(user_id_to=user_profile).values_list('user_id_from', flat=True)) + \
    list(Link.objects.filter(user_id_from=user_profile).values_list('user_id_to', flat=True))

    # Fetch all, excluding the current user
    all_profiles = Profile.objects.filter(Q(user_id__in=links)).order_by('name', 'surname')

    # no search term, return all profiles sorted
    if not search_term:
        filtered_profiles = all_profiles
    else:
        search_terms = search_term.split()

        # Apply the search filter based on the number of search terms
        if len(search_terms) == 2:
            first_name, last_name = search_terms
            filtered_profiles = all_profiles.filter(
                Q(name__icontains=first_name) & Q(surname__icontains=last_name)
            ).order_by('name', 'surname') 
        else:
            # If only one term is provided, search by either name or surname
            filtered_profiles = all_profiles.filter(
                Q(name__icontains=search_term) | 
                Q(surname__icontains=search_term)
            ).order_by('name', 'surname')  

    paginator = CustomPagination()
    paginated_profiles = paginator.paginate_queryset(filtered_profiles, request)
    serializer = ProfileBannerSerializer(paginated_profiles, many=True, context={'authenticated_user': user_profile})

    return paginator.get_paginated_response(serializer.data)
    

# Fetching searched users that are not links
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_searching_non_links(request):
    search_term = request.data.get('search', '').strip()
    user_profile = request.user.profile

    links = list(Link.objects.filter(user_id_to=user_profile).values_list('user_id_from', flat=True)) + \
    list(Link.objects.filter(user_id_from=user_profile).values_list('user_id_to', flat=True)) + [request.user.user_id]

    all_profiles = Profile.objects.filter(~Q(user_id__in=links)).order_by('name', 'surname')

    if not search_term:
        filtered_profiles = all_profiles
    else:
        search_terms = search_term.split()

        if len(search_terms) == 2:
            first_name, last_name = search_terms
            filtered_profiles = all_profiles.filter(
                Q(name__icontains=first_name) & Q(surname__icontains=last_name)
            ).order_by('name', 'surname')  
        else:
            filtered_profiles = all_profiles.filter(
                Q(name__icontains=search_term) | 
                Q(surname__icontains=search_term)
            ).order_by('name', 'surname')  

    paginator = CustomPagination()
    paginated_profiles = paginator.paginate_queryset(filtered_profiles, request)
    serializer = ProfileBannerSerializer(paginated_profiles, many=True, context={'authenticated_user': user_profile})
    return paginator.get_paginated_response(serializer.data)