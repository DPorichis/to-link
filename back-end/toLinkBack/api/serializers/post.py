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
    class Meta:
        model = Comment
        fields = ['comment_id', 'post', 'user', 'text']
        read_only_fields = ['comment_id', 'user']
    
    def create(self, validated_data):
        return Comment.objects.create(**validated_data)