from rest_framework import serializers
from api.models import Profile, Request,Link

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ["user_id_from", "user_id_to"]
        read_only_fields = ["user_id_to"]


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ["user_id_from", "user_id_to"]
        read_only_fields = ["user_id_from", "user_id_to"]
        
