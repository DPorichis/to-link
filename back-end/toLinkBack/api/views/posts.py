from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.models import Post, LikedBy, Profile, Comment
from api.serializers import PostSerializer, CommentSerializer, LikedBySerializer
from django.db.models import F

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_post_by_id(request):
    # Retrieve post ID from the request data
    post_id = request.data.get('post_id')

    # Validate input data
    if not post_id:
        return Response({"error": "Post ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Try to find the post by ID
        post = Post.objects.get(post_id=post_id)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        # Return an error if the post does not exist
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_post(request):
    
    serializer = PostSerializer(data=request.data)

    user = request.user
    
    # Attempt to get the profile associated with the authenticated user
    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

    # Validate the serializer data
    if serializer.is_valid():
        # Save the serializer to create a new post with the uploaded file
        post = serializer.save(user=profile)
        return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)
    else:
        # Return an error response if the data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Requires authentication
def like_post(request):
    post_id = request.data.get('post_id')

    # Validate input data
    if not post_id:
        return Response({"error": "Post ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Try to find the post by ID
        post = Post.objects.get(post_id=post_id)
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the like already exists
    user = request.user.profile
    try:
        liked_by = LikedBy.objects.get(post=post, user=user)
        # If exists, unlike the post
        liked_by.delete()
        post.like_cnt = F('like_cnt') - 1
        post.save(update_fields=['like_cnt'])
        return Response({"message": "Post unliked successfully."}, status=status.HTTP_200_OK)
    except LikedBy.DoesNotExist:
        # If not exists, like the post
        LikedBy.objects.create(post=post, user=user)
        post.like_cnt = F('like_cnt') + 1
        post.save(update_fields=['like_cnt'])
        return Response({"message": "Post liked successfully."}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Requires authentication
def comment_post(request):
    post_id = request.data.get('post')

    # Validate input data
    if not post_id:
        return Response({"error": "Post ID is required."}, status=status.HTTP_400_BAD_REQUEST)
 
    try:
        # Try to find the post by ID
        post = Post.objects.get(post_id=post_id)
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    # Attempt to get the profile associated with the authenticated user
    user = request.user

    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        comment = serializer.save(user=request.user.profile, post=post)
        post.like_cnt = F('comment_cnt') + 1
        return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Requires authentication
def get_comments_by_post(request):
    post_id = request.data.get('post')  # Extract post_id from request data

    if not post_id:
        return Response({"error": "Post ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Retrieve the post
        post = Post.objects.get(post_id=post_id)
        
        # Retrieve all comments for the post
        comments = Comment.objects.filter(post=post)
        
        # Serialize the comments
        serializer = CommentSerializer(comments, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
    