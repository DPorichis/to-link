from rest_framework import serializers
from api.models import Profile, Listing, Applied

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['post_id', 'text', 'media', 'links', 'like_cnt', 'comment_cnt', 'user']
        read_only_fields = ['post_id', 'like_cnt', 'comment_cnt', 'user']
        # Add any other fields you want to be updatable
    