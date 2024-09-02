from rest_framework import serializers
from api.models import Profile, Listing, Applied

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['listing_id', 'user', 'title', 'visible', 'spot', 'time', 'level', 'desc']
        read_only_fields = ['listing_id', 'user']
        # Add any other fields you want to be updatable
