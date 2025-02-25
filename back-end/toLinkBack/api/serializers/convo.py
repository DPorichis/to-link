# convo.py
# This module contains serializers used in APIs for messaging.
#######################################################################

from rest_framework import serializers
from api.models import Profile, Convo, Dm

# Used for fetching and creating dms
class DMSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dm
        fields = ["dm_id", "convo", "media", "user", "timestamp", "text"]
        read_only_fields = ["dm_id", "user", "timestamp"]

    def validate(self, data):
        if not data.get('media') and not data.get('text'):
            raise serializers.ValidationError("Either text or media must be provided.")
        return data

# Produces the data used in convo tiles in DMs
class ConvoSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    notification = serializers.SerializerMethodField()
    
    class Meta:
        model = Convo
        fields = ['convo_id', 'user_info', 'timestamp', 'notification']
        read_only_fields = ['convo_id', 'user_info', 'timestamp', 'notification']
    
    def get_user_info(self, obj):
        authenticated_user = self.context.get('authenticated_user')
        print(obj)
        if obj.user_id1 == authenticated_user:
            other_user = obj.user_id2
        else:
            other_user = obj.user_id1

        other_user_profile = Profile.objects.get(user_id=other_user)

        if other_user_profile.pfp:
            file_url = "http://127.0.0.1:8000" + other_user_profile.pfp.url
        else:
            file_url = "/default.png" 


        return {
            'name': other_user_profile.name,
            'surname': other_user_profile.surname,
            'title': other_user_profile.title,
            'user': other_user_profile.user.user_id,
            'pfp': file_url
        }
    
    def get_notification(self, obj):
        authenticated_user = self.context.get('authenticated_user')
        print(obj)
        if obj.user_id1 == authenticated_user:
            usr = 1
            other_user = obj.user_id2
        else:
            usr = 2
            other_user = obj.user_id1
        if obj.last_dm != usr:
            if obj.user_id1_last < obj.timestamp and usr == 1:
                return True
            elif obj.user_id2_last < obj.timestamp and usr == 2:
                return True
        return False
        
# Used to create a new convo
class ConvoCreatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Convo
        fields = ['convo_id', 'user_id', 'timestamp']
        read_only_fields = ['convo_id', 'timestamp']