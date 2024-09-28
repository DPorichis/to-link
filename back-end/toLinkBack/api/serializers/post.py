#posts.py
#this module contains serializer used in APIs for media
##########################################################


from rest_framework import serializers
from api.models import Profile, Post, LikedBy, Comment, PostMedia


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = ['image', 'media_type']

class PostVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = ['video', 'media_type']

class PostAudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = ['audio', 'media_type']

class PostSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    videos = serializers.SerializerMethodField()
    audios = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['post_id', 'text', 'media', 'links', 'like_cnt', 'comment_cnt', 'user', 'images', 'videos', 'audios', 'user_info']
        read_only_fields = ['post_id', 'like_cnt', 'comment_cnt', 'user', 'images', 'videos', 'audios', 'user_info']
        # Add any other fields you want to be updatable
    
    def create(self, validated_data):
        # This method will be used in the view to create a new post with the user set manually
        user = validated_data.pop('user', None)  # Extract the user from validated_data if present
        post = Post.objects.create(**validated_data, user=user)
        return post
    
    def get_user_info(self, obj):
        # Get the authenticated user from the context
        other_user = obj.user

        # Fetch the profile associated with the other user
        profile = Profile.objects.get(user_id=other_user)

        if profile.pfp:
            # Access the file if it exists
            file_url = "http://127.0.0.1:8000" + profile.pfp.url
        else:
            # Handle the case where no file is uploaded
            file_url = "/default.png"

        return {
            'name': profile.name,
            'surname': profile.surname,
            'title': profile.title,
            'pfp': file_url
        }
    
    def get_images(self, obj):
        if(obj.media):
            images = PostMedia.objects.filter(post_id=obj.post_id, media_type="image")         
            serializer = PostImageSerializer(images, many=True)
            
            return serializer.data
        else:
            return []
    
    def get_videos(self, obj):
        if(obj.media):
            videos = PostMedia.objects.filter(post_id=obj.post_id, media_type="video")         
            serializer = PostVideoSerializer(videos, many=True)
            
            return serializer.data
        else:
            return []

    def get_audios(self, obj):
        if(obj.media):
            audios = PostMedia.objects.filter(post_id=obj.post_id, media_type="audio")         
            serializer = PostAudioSerializer(audios, many=True)
            
            return serializer.data
        else:
            return []



class LikedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedBy
        fields = ['post', 'user']


class CommentSerializer(serializers.ModelSerializer):
    profile_info = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ['comment_id', 'post_id', 'user', 'text','profile_info']
        read_only_fields = ['comment_id', 'user','profile_info']
    
    def get_profile_info(self, obj):
        # Get the authenticated user from the context
        other_user = obj.user

        # Fetch the profile associated with the other user
        profile = Profile.objects.get(user_id=other_user)

        if profile.pfp:
            # Access the file if it exists
            file_url = "http://127.0.0.1:8000" + profile.pfp.url
        else:
            # Handle the case where no file is uploaded
            file_url = "/default.png"

        return {
            'name': profile.name,
            'surname': profile.surname,
            'title': profile.title,
            'pfp': file_url
        }
    
    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

class PostIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['post_id']