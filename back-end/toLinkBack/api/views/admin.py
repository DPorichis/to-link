# admin.py
# This module contains API views for admins to fetch connections, personal information, listings,
# comments, likes, and posts.
# Additionally, there is an API view for admins to export data in XML and JSON formats.
###########################################################################################################

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from api.models import Profile, Link, User, Listing, Applied, Comment, Post, LikedBy
from api.serializers import ListingSerializer, LinkSerializer, UserSerializer, AdminAppliedSerializer, \
    AdminProfileSerializer, CommentSerializer, PostSerializer, LikedBySerializer, ConnectionSerializer
from django.db.models import Q

import json
import dicttoxml
from io import BytesIO
from django.http import HttpResponse

from rest_framework.pagination import PageNumberPagination
class UserPagination(PageNumberPagination):
    page_size = 20

class EntryPagination(PageNumberPagination):
    page_size = 10

@api_view(['POST'])
@permission_classes([IsAdminUser])
def admin_fetch_connections(request):
    # Get the user ID from the request data
    user_id = request.data.get('user_id')

    if not user_id:
        return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_profile = Profile.objects.get(user_id=user_id)
    except Profile.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    links = Link.objects.filter(Q(user_id_to=user_id) | Q(user_id_from=user_id)).order_by("user_id_from")
    
    paginator = EntryPagination()
    paginated_entries = paginator.paginate_queryset(links, request)
    serializer = ConnectionSerializer(links, many=True, context={'other_user': user_profile})

    return paginator.get_paginated_response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def admin_fetch_personal(request):
    # Get the user ID from the request data
    user_id = request.data.get('user_id')

    if not user_id:
        return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(user_id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def admin_fetch_listings(request):
    user_id = request.data.get('user_id')
    try:
        target_user = Profile.objects.get(user_id=user_id)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    listings = Listing.objects.filter(user=target_user).order_by("listing_id")
    
    paginator = EntryPagination()
    paginated_entries = paginator.paginate_queryset(listings, request)
    serializer = ListingSerializer(paginated_entries, many=True)

    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def admin_fetch_applications(request):
    user_id = request.data.get('user_id')
    try:
        target_user = Profile.objects.get(user_id=user_id)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    applications = Applied.objects.filter(user=target_user).order_by("listing")
    
    paginator = EntryPagination()
    paginated_entries = paginator.paginate_queryset(applications, request)
    serializer = AdminAppliedSerializer(paginated_entries, many=True)

    return paginator.get_paginated_response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAdminUser])
def admin_fetch_profile(request):
    # Get the authenticated user
    user = request.user
    user_target = request.data.get('user_id')
    
    # Attempt to get the profile associated with the authenticated user
    try:
        profile = Profile.objects.get(user_id=user_target)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = AdminProfileSerializer(profile,  context={'authenticated_user': user})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def admin_fetch_comments(request):
    # Get the user ID from the request data
    user_id = request.data.get('user_id')

    if not user_id:
        return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Retrieve the post
        user = Profile.objects.get(user_id=user_id)
    except Profile.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    
    comments = Comment.objects.filter(user=user).order_by("comment_id")
    
    paginator = EntryPagination()
    paginated_entries = paginator.paginate_queryset(comments, request)
    serializer = CommentSerializer(paginated_entries, many=True)

    return paginator.get_paginated_response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def admin_fetch_likes(request):
    # Get the user ID from the request data
    user_id = request.data.get('user_id')

    if not user_id:
        return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Retrieve the post
        user = Profile.objects.get(user_id=user_id)
    except Profile.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    

    likes = LikedBy.objects.filter(user=user).order_by("post")
    
    paginator = EntryPagination()
    paginated_entries = paginator.paginate_queryset(likes, request)
    serializer = LikedBySerializer(paginated_entries, many=True)

    return paginator.get_paginated_response(serializer.data)
    
@api_view(['POST'])
@permission_classes([IsAdminUser])
def admin_fetch_posts(request):

    # Get the user ID from the request data
    user_id = request.data.get('user_id')

    if not user_id:
        return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        # Retrieve the post
        user = Profile.objects.get(user_id=user_id)
    except Profile.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    posts = Post.objects.filter(user=user).order_by("post_id")

    paginator = EntryPagination()
    paginated_entries = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(paginated_entries, many=True)

    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def admin_fetch_users(request):
    search_term = request.data.get('search', '').strip()
    filter_by = request.data.get('filter_by', 'anything').strip()
    print(filter_by)

    if not search_term:
        filtered_profiles = Profile.objects.all()
    else:
        # Apply filtering based on the 'filter_by' value
        if filter_by == 'name':
            filtered_profiles = Profile.objects.filter(
                Q(name__icontains=search_term) | 
                Q(surname__icontains=search_term)
            )
        elif filter_by == 'email':
            filtered_profiles = Profile.objects.filter(user__email__icontains=search_term)
        elif filter_by == 'uid':
            # Handle numeric search for user_id
            try:
                search_number = int(search_term)
                filtered_profiles = Profile.objects.filter(user_id =search_number)
            except ValueError:
                # Handle the case where search_term is not an integer
                filtered_profiles = Profile.objects.none()
        else:  # Default case: search across all fields
            try:
                search_number = int(search_term)
                filtered_profiles = Profile.objects.filter(
                Q(user_id=search_number)
                )
            except ValueError:
                filtered_profiles = Profile.objects.filter(
                    Q(name__icontains=search_term) |
                    Q(surname__icontains=search_term) |
                    Q(user__email__icontains=search_term)
                )

    paginator = UserPagination()
    paginated_profiles = paginator.paginate_queryset(filtered_profiles, request)
    serializer = AdminProfileSerializer(paginated_profiles, many=True)

    # Return the paginated response
    return paginator.get_paginated_response(serializer.data)
    

@api_view(['POST'])
@permission_classes([IsAdminUser])
def request_export(request):
    # Get the user ID from the request data
    user_ids = request.data.get('selectedUsers')
    artifacts = request.data.get('selectedArtifacts')
    export_type = request.data.get('format')
    print(export_type)


    response = {}
    for user in user_ids:
        user_data = {}
        if not user:
            break
        
        try:
            user_profile = Profile.objects.get(user_id=user)
        except Profile.DoesNotExist:
            user_data["error"] = "User ID is required"
            response[user.user_id] = user_data
            break

        for artif in artifacts:
            if artif == "Personal Information":
                try:
                    pers = User.objects.get(user_id=user)
                    serializer = UserSerializer(pers)
                    user_data["personal"] = serializer.data

                except User.DoesNotExist:
                    user_data["personal"] = {"error": "personal info not found"}
            elif artif == "Profile Information":                
                serializer = AdminProfileSerializer(user_profile)
                user_data["profile"] = serializer.data
            elif artif == "Posts":
                try:
                    # Retrieve all comments for the post
                    posts = Post.objects.filter(user=user_profile)
                    serializer = PostSerializer(posts, many = True)
                    user_data["posts"] = serializer.data
                except Post.DoesNotExist:
                    user_data["posts"] = []
            elif artif == "Listings":
                listings = Listing.objects.filter(user=user_profile)
                
                if listings.exists():
                    serializer = ListingSerializer(listings, many=True)
                    user_data["listings"] = serializer.data
                else:
                    user_data["listings"] = []
                
            elif artif == "Network":
                
                links = Link.objects.filter(Q(user_id_to=user_profile) | Q(user_id_from=user_profile))
                # Check if any links are found
                if links.exists():
                    serializer = LinkSerializer(links, many=True)
                    user_data["network"] = serializer.data
                else:
                    user_data["network"] = []
            elif artif == "Comments":
                try:
                    # Retrieve all comments for the post
                    comments = Comment.objects.filter(user=user_profile)
                    serializer = CommentSerializer(comments, many=True)
                    user_data["comments"] = serializer.data
                except Comment.DoesNotExist:
                    user_data["comments"] = {}
            elif artif == "Likes":
                try:
                    likes = LikedBy.objects.filter(user=user_profile)
                    serializer = LikedBySerializer(likes, many = True)
                    user_data["likes"] = serializer.data
                except LikedBy.DoesNotExist:
                    user_data["likes"] = {}
            elif artif == "Applications":
                applications = Applied.objects.filter(user=user_profile)    
                if applications.exists():
                    serializer = AdminAppliedSerializer(applications, many=True)
                    user_data["applications"] = serializer.data
                else:
                    user_data["applications"] = {}
        
        response[user] = user_data
    # Export in the requested format and sent it back to the user
    if export_type == "XML":
        # XML saving
        xml_data = dicttoxml.dicttoxml(response)
        xml_file = BytesIO(xml_data)

        # File sent out
        answer = HttpResponse(xml_file, content_type='application/xml')
        answer['Content-Disposition'] = 'attachment; filename="user_data.xml"'
    else:
        # JSON saving
        json_data = json.dumps(response, indent=4)
        json_file = BytesIO(json_data.encode('utf-8'))

        # File sent out
        answer = HttpResponse(json_file, content_type='application/json')
        answer['Content-Disposition'] = 'attachment; filename="user_data.json"'
    return answer
