# media.py
# this module contains serializer used in APIs for media
##########################################################

from rest_framework import serializers
from api.models import PostMedia

# Used for managing PostMedia (Not in use currently)
class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = ['media_id', 'user', 'post', 'media_type', 'image', 'video', 'audio', 'uploaded_at']

    def validate(self, data):
        #only one media type is uploaded
        media_fields = ['image', 'video', 'audio']
        media_count = sum(1 for field in media_fields if data.get(field))

        if media_count > 1:
            raise serializers.ValidationError("Only one type of media (image, video, or audio) is allowed.")
        elif media_count == 0:
            raise serializers.ValidationError("At least one media (image, video, or audio) must be uploaded.")
        
        return data