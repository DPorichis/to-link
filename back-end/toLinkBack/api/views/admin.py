from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.models import Profile, Link, User, Listing, Applied, Comment, Post, LikedBy
from api.serializers import ListingSerializer, LinkSerializer, UserSerializer, AppliedSerializer, \
    AdminProfileSerializer, CommentSerializer, PostSerializer, LikedBySerializer
from django.db.models import Q

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def admin_fetch_connections(request):
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def admin_fetch_listings(request):
    user_id = request.data.get('user_id')
    try:
        target_user = Profile.objects.get(user_id=user_id)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    listings = Listing.objects.filter(user=target_user)
    
    if listings.exists():
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"message":"No listings ... :("}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def admin_fetch_applications(request):
    user_id = request.data.get('user_id')
    try:
        target_user = Profile.objects.get(user_id=user_id)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    applications = Applied.objects.filter(user=target_user)
    
    if applications.exists():
        serializer = AppliedSerializer(applications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"message":"No applications"}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
    
    try:
        # Retrieve all comments for the post
        comments = Comment.objects.filter(user=user)
    except Comment.DoesNotExist:
        return Response({"error": "Comments not found."}, status=status.HTTP_404_NOT_FOUND)
    
    
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
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
    
    try:
        # Retrieve all comments for the post
        likes = LikedBy.objects.filter(user=user)
    except LikedBy.DoesNotExist:
        return Response({"error": "Likes not found."}, status=status.HTTP_404_NOT_FOUND)
    
    
    serializer = LikedBySerializer(likes, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
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

    try:
        # Retrieve all comments for the post
        posts = Post.objects.filter(user=user)
    except Post.DoesNotExist:
        return Response({"error": "Posts not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = PostSerializer(posts, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)
