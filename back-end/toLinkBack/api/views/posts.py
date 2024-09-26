from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.models import Post, LikedBy, Profile, Comment, PostMedia, Notification, Link, PostRecom
from api.serializers import PostSerializer, CommentSerializer, LikedBySerializer,PostIdSerializer
from django.db.models import F, Q
from django.db.models import Max
from itertools import chain

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_post_by_id(request):
    # Retrieve post IDs from the request data
    post_ids = request.data.get('post_id')

    # Validate input data - post_ids should be a list
    if not post_ids or not isinstance(post_ids, list):
        return Response({"error": "Post IDs should be provided as a list."}, status=status.HTTP_400_BAD_REQUEST)

    # Ensure the post_ids list contains only numbers (in case dictionaries are passed)
    try:
        post_ids = [item['post_id'] if isinstance(item, dict) else item for item in post_ids]
    except KeyError:
        return Response({"error": "Each dictionary must contain 'post_id' key."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Get posts where the post_id is in the list of post_ids
        posts = Post.objects.filter(post_id__in=post_ids).order_by("-timestamp")
        
        if not posts.exists():
            return Response({"error": "No posts found for the given IDs."}, status=status.HTTP_404_NOT_FOUND)
        
        # Serialize and return the posts
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        # Return a generic error if something goes wrong
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_post(request):

    user = request.user
    
    # Attempt to get the profile associated with the authenticated user
    try:
        profile = Profile.objects.get(user_id=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

    serializer = PostSerializer(data=request.data)

    # Validate the serializer data
    if serializer.is_valid():
        # Save the serializer to create a new post with the uploaded file
        post = serializer.save(user=profile)

        # Handle the images
        images = request.FILES.getlist('image_uploads')  # 'image_uploads' is the field name for multiple images

        # Create a PostImage instance for each uploaded image
        for image in images:
            PostMedia.objects.create(post=post, image=image, user=profile)
        
        profile.post_cnt = F('post_cnt') + 1
        profile.save(update_fields=['post_cnt'])

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
        like = LikedBy.objects.create(post=post, user=user)
        profile = Profile.objects.get(user_id=post.user_id)
        Notification.objects.create(like=like, user_from=user, user_to=profile, type="like")
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
        post.comment_cnt = F('comment_cnt') + 1
        post.save(update_fields=['comment_cnt'])
        profile = Profile.objects.get(user_id=post.user_id)
        Notification.objects.create(comment_id=comment, user_from=user.profile, user_to=profile, type="comment")
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
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_all_posts(request):
    # Retrieve all posts
    posts = Post.objects.all().order_by('-post_id')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_posts_id(request):

    user_profile = request.user.profile

    # Networks Posts
    links = list(Link.objects.filter(user_id_to=user_profile).values_list('user_id_from', flat=True)) + \
    list(Link.objects.filter(user_id_from=user_profile).values_list('user_id_to', flat=True)) + [request.user.user_id]
    
    print(links)

    network_posts = list(Post.objects.filter(user__in=links).values('post_id').annotate(timestamp=Max('timestamp')).distinct())

    network_posts = [{'post_id': post['post_id'], 'timestamp': post['timestamp'], 'priority': 3} for post in network_posts]


    # User's Recommendation Posts
    recom_posts_no_tmstp = list(PostRecom.objects.filter(user=user_profile).values_list('post_id', flat=True))
    recom_posts = list(Post.objects.filter(post_id__in=recom_posts_no_tmstp).values('post_id', 'timestamp'))

    recom_posts = [{'post_id': post['post_id'], 'timestamp': post['timestamp'], 'priority': 2} for post in recom_posts]
    

    # Network reacts posts
    network_like_posts = list(LikedBy.objects.filter(user__in=links).values_list('post', flat=True).distinct())
    network_comment_posts = list(Comment.objects.exclude(post__in=network_like_posts).values_list('post', flat=True).distinct())
    react_posts_no_tmstp = network_comment_posts + network_like_posts

    react_posts = list(Post.objects.filter(post_id__in=react_posts_no_tmstp).values('post_id', 'timestamp'))
    react_posts = [{'post_id': post['post_id'], 'timestamp': post['timestamp'], 'priority': 1} for post in react_posts]

    # Compine posts for sorting
    all_posts = list(chain(network_posts, recom_posts, react_posts))

    # Sort posts by priority and timestamp (descending)
    sorted_posts = sorted(all_posts, key=lambda post: (post['priority'], post['timestamp']), reverse=True)
    sorted_post_ids = [post['post_id'] for post in sorted_posts]

    return Response(sorted_post_ids, status=status.HTTP_200_OK)
#    serializer = PostIdSerializer(posts, many=True) 
#    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_if_like_exist(request):
    user = request.user.profile
    post_id = request.data.get('post_id')
    if not post_id:
        return Response({"error": "Post ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        post = Post.objects.get(post_id=post_id)
    except Post.DoesNotExist:
        return Response({"error": "Post does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    if LikedBy.objects.filter(post=post, user=user).exists():
        return Response({"liked": True}, status=status.HTTP_200_OK)
    else:
        return Response({"liked": False}, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_post_by_user_id(request):
    # Retrieve post ID from the request data
    user_id = request.data.get('user_id')

    if user_id=="own":
        user_id = request.user.profile

    # Validate input data
    if not user_id:
        return Response({"error": "Post ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Try to find the post by ID
        posts = Post.objects.filter(user_id=user_id).order_by('-timestamp')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        # Return an error if the post does not exist
        return Response([], status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_post(request):
    post_id = request.data.get('post_id')

    if not post_id:
        return Response({"error": "Post ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        post = Post.objects.get(post_id=post_id)
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    if post.user != request.user.profile:
        return Response({"error": "You do not have permission to delete this post."}, status=status.HTTP_403_FORBIDDEN)

    try:
        # Delete related media
        PostMedia.objects.filter(post=post).delete()

        # Delete the post
        post.delete()

        # Optionally, update the user's profile post count
        profile = Profile.objects.get(user_id=post.user.user_id)
        profile.post_cnt = F('post_cnt') - 1
        profile.save(update_fields=['post_cnt'])

        return Response({"message": "Post deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)