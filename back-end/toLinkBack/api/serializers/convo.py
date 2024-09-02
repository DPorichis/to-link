from rest_framework import serializers
from api.models import Profile, Convo, Dm

class DMSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dm
        fields = ["dm_id", "convo", "media", "user", "timestamp", "text"]
        read_only_fields = ["dm_id", "user", "timestamp"]


class ConvoSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()

    class Meta:
        model = Convo
        fields = ['convo_id', 'user_info', 'timestamp']
        read_only_fields = ['convo_id', 'user_info', 'timestamp']


    def get_user_info(self, obj):
        # Get the authenticated user from the context
        authenticated_user = self.context.get('authenticated_user')
        print(obj)
        # Determine which user is not the authenticated user
        if obj.user_id1 == authenticated_user:
            other_user = obj.user_id2
        else:
            other_user = obj.user_id1

        # Fetch the profile associated with the other user
        other_user_profile = Profile.objects.get(user_id=other_user)

        return {
            'name': other_user_profile.name,
            'surname': other_user_profile.surname,
            'title': other_user_profile.title
        }
    
class ConvoCreatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Convo
        fields = ['convo_id', 'user_id', 'timestamp']
        read_only_fields = ['convo_id', 'timestamp']