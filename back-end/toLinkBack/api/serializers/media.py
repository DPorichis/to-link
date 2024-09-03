from rest_framework import serializers
from api.models import PostMedia

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = ['media_id', 'user', 'image', 'uploaded_at', 'post']
        read_only_fields = ['id', 'user', 'uploaded_at']