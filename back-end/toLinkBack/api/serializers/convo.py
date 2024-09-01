from rest_framework import serializers
from api.models import Profile, Convo, Dm

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Convo
        fields = ["convo_id", "user_id1", "user_id2"]
        read_only_fields = ["convo_id", "user_id1", "user_id2"]


class DMSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dm
        fields = ["dm_id", "convo", "media", "user", "timestamp", "text"]
        read_only_fields = ["dm_id", "user", "timestamp"]
