from rest_framework import serializers
from api.models import Profile, Request,Link

class RequestSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    class Meta:
        model = Request
        fields = ["user_id_from", "user_id_to",'user_info']
        read_only_fields = ["user_id_to"]

    def get_user_info(self, obj):
        
        # Fetch the profile associated with the other user
        other_user_profile = Profile.objects.get(user=obj.user_id_from)

        if other_user_profile.pfp:
            # Access the file if it exists
            file_url = "http://127.0.0.1:8000" + obj.pfp.url
        else:
            # Handle the case where no file is uploaded
            file_url = "/default.png"


        return {
            'name': other_user_profile.name,
            'surname': other_user_profile.surname,
            'title': other_user_profile.title,
            'pfp': file_url
        }




class LinkSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    class Meta:
        model = Link
        fields = ["user_id_from", "user_id_to",'user_info']
        read_only_fields= ["user_id_to"]
    
    def get_user_info(self, obj):
        # Get the authenticated user from the context
        authenticated_user = self.context.get('authenticated_user')
        print(obj)
        # Determine which user is not the authenticated user
        if obj.user_id_from == authenticated_user:
            other_user = obj.user_id_to
        else:
            other_user = obj.user_id_from

        # Fetch the profile associated with the other user
        other_user_profile = Profile.objects.get(user_id=other_user)

        if other_user_profile.pfp:
            # Access the file if it exists
            file_url = "http://127.0.0.1:8000" + other_user_profile.pfp.url
        else:
            # Handle the case where no file is uploaded
            file_url = "/default.png"


        return {
            'name': other_user_profile.name,
            'surname': other_user_profile.surname,
            'title': other_user_profile.title,
            'pfp': file_url
        }
        
