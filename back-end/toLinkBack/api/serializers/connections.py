#connections.py 
#This module contains serializers used in APIs for connections
# ################################################################# 

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
            file_url = "https://127.0.0.1:8000" + obj.pfp.url
        else:
            # Handle the case where no file is uploaded
            file_url = "/default.png"


        return {
            'name': other_user_profile.name,
            'surname': other_user_profile.surname,
            'title': other_user_profile.title,
            'pfp': file_url,
            'user_id': other_user_profile.user.user_id
        }




class LinkSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    class Meta:
        model = Link
        fields = ["user_id_from", "user_id_to", 'user_info']
        read_only_fields= ["user_id_to"]
    
    def get_user_info(self, obj):
        authenticated_user = self.context.get('authenticated_user')
        print(obj)
        # Determine which user is not the authenticated user
        if obj.user_id_from == authenticated_user:
            other_user = obj.user_id_to
        else:
            other_user = obj.user_id_from

        other_user_profile = Profile.objects.get(user_id=other_user)

        if other_user_profile.pfp:
            file_url = "https://127.0.0.1:8000" + other_user_profile.pfp.url
        else:
            file_url = "/default.png"


        return {
            'name': other_user_profile.name,
            'surname': other_user_profile.surname,
            'title': other_user_profile.title,
            'pfp': file_url,
            'user_id': other_user_profile.user.user_id
        }
        
class ConnectionSerializer(serializers.ModelSerializer):
    profile_info = serializers.SerializerMethodField()
    relationship = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()
    class Meta:
        model = Link
        fields = ["user_id_from", "user_id_to",'profile_info', "relationship", "user_id"]
        read_only_fields= ["user_id_to", "relationship", "user_id"]
    
    def get_profile_info(self, obj):
        # Get the authenticated user from the context
        authenticated_user = self.context.get('authenticated_user')
        target_user = self.context.get('other_user')
        
        print(obj)
        # Determine which user is not the authenticated user
        if obj.user_id_from == target_user:
            other_user = obj.user_id_to
        else:
            other_user = obj.user_id_from

        other_user_profile = Profile.objects.get(user_id=other_user)

        if other_user_profile.pfp:
            file_url = "https://127.0.0.1:8000" + other_user_profile.pfp.url
        else:
            file_url = "/default.png"


        return {
            'name': other_user_profile.name,
            'surname': other_user_profile.surname,
            'title': other_user_profile.title,
            'pfp': file_url,
            'user_id': other_user_profile.user.user_id
        }
    
    def get_user_id(self, obj):
        target_user = self.context.get('other_user')

        if obj.user_id_from == target_user:
            other_user = obj.user_id_to
        else:
            other_user = obj.user_id_from
        return other_user.user.user_id

        
    def get_relationship(self, obj):
        authenticated_user = self.context.get('authenticated_user')
        target_user = self.context.get('other_user')

        if authenticated_user is None:
            return "No Authentication"

        if obj.user_id_from == target_user:
            other_user = obj.user_id_to
        else:
            other_user = obj.user_id_from


        # Check if the authenticated user is the same as the object user
        if other_user == authenticated_user.user_id:
            return "Self"
        if Link.objects.filter(user_id_to=other_user, user_id_from=authenticated_user).exists() or \
            Link.objects.filter(user_id_to=authenticated_user, user_id_from=other_user).exists():
            return "Friends"
        if Request.objects.filter(user_id_from=authenticated_user, user_id_to=other_user).exists():
            return "Pending Request Sent"
        if Request.objects.filter(user_id_from=other_user, user_id_to=authenticated_user).exists():
            return "Pending Request Received"

        # If no link or pending request exists
        return "No Connection"
