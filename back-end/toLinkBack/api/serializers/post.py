from rest_framework import serializers
from api.models import Profile, Post, LikedBy, Comment

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['post_id', 'text', 'media', 'links', 'like_cnt', 'comment_cnt', 'user']
        read_only_fields = ['post_id', 'like_cnt', 'comment_cnt', 'user']
        # Add any other fields you want to be updatable
    
    def create(self, validated_data):
        # This method will be used in the view to create a new post with the user set manually
        user = validated_data.pop('user', None)  # Extract the user from validated_data if present
        post = Post.objects.create(**validated_data, user=user)
        return post

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

        return {
            'name': profile.name,
            'surname': profile.surname,
            'title': profile.title
        }
    
    def create(self, validated_data):
        return Comment.objects.create(**validated_data)