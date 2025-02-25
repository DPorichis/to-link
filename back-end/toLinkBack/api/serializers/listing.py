# listing.py
# This module contains serializers used in APIs for listings
##############################################################

from rest_framework import serializers
from api.models import Profile, Listing, Applied, Link, Request

# Used for creating and fetching listings
class ListingSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Listing
        fields = ['listing_id', 'user', 'title', 'visible', 'spot', 'time', 'level', 'desc', 'skills', 'location', 'timestamp', 'user_info', 'apl_cnt']
        read_only_fields = ['listing_id', 'user', 'timestamp', 'user_info', 'apl_cnt']
            
    def create(self, validated_data):
        user = validated_data.pop('user', None)
        post = Listing.objects.create(**validated_data, user=user)
        return post

    def get_user_info(self, obj):
        other_user = obj.user

        profile = Profile.objects.get(user_id=other_user)

        return {
            'name': profile.name,
            'surname': profile.surname,
            'title': profile.title
        }


# Used for updating listings
class ListingUpdateSerializer(serializers.ModelSerializer):
    
    user_info = serializers.SerializerMethodField()

    class Meta:
        model = Listing
        fields = ['listing_id', 'user', 'title', 'visible', 'spot', 'time', 'level', 'desc', 'skills', 'location', 'timestamp', 'user_info', 'apl_cnt']
        read_only_fields = ['listing_id', 'user', 'timestamp', 'user_info', 'apl_cnt']

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
    def get_user_info(self, obj):
        other_user = obj.user

        profile = Profile.objects.get(user_id=other_user)

        return {
            'name': profile.name,
            'surname': profile.surname,
            'title': profile.title
        }

# Used for applying to jobs (Creation and fetching)
class AppliedSerializer(serializers.ModelSerializer):
    profile_info = serializers.SerializerMethodField()
    relationship = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()
    class Meta:
        model = Applied
        fields = ['user', 'profile_info', 'relationship', 'user_id']
        read_only_fields = ['user', 'profile_info', 'relationship', 'user_id']

    def get_profile_info(self, obj):
        if obj.user.pfp:
            file_url = "http://127.0.0.1:8000" + obj.user.pfp.url
        else:
            file_url = "/default.png"  # default image in front-end
        
        return{
        "pfp": file_url,
        "name": obj.user.name,
        "surname": obj.user.surname,
        "title": obj.user.title,
        }
    
    def get_user_id(self, obj):
        return obj.user.user_id
    
    def get_relationship(self, obj):
        authenticated_user = self.context.get('authenticated_user')

        if authenticated_user is None:
            return "No Authentication"

        # Check if the authenticated user is the same as the object user
        if obj.user_id == authenticated_user.user_id:
            return "Self"

        # Check for a link (friendship)
        if Link.objects.filter(user_id_to=obj.user, user_id_from=authenticated_user).exists() or \
            Link.objects.filter(user_id_to=authenticated_user, user_id_from=obj.user).exists():
            return "Friends"

        # Check for request authenticated user to the obj
        if Request.objects.filter(user_id_from=authenticated_user, user_id_to=obj.user).exists():
            return "Pending Request Sent"

        # Check for request obj to the authenticated user
        if Request.objects.filter(user_id_from=obj.user, user_id_to=authenticated_user).exists():
            return "Pending Request Received"

        # If no link or pending request exists
        return "No Connection"
    

# Used for Admin view of a users applications, returns listing relevant information too.
class AdminAppliedSerializer(serializers.ModelSerializer):
    listing_info = serializers.SerializerMethodField()
    class Meta:
        model = Applied
        fields = ['user', 'listing_info']
        read_only_fields = ['user', 'listing_info']

    def get_listing_info(self, obj):
        obj.listing.listing_id
        
        if obj.user.pfp:
            file_url = "http://127.0.0.1:8000" + obj.user.pfp.url
        else:
            file_url = "/default.png" # default image in front-end
        
        return{
            "listing_id": obj.listing.listing_id,
            "title": obj.listing.title,
            "user_id": obj.listing.user.user_id
        }
    
    def get_user_id(self, obj):
        return obj.user.user_id
    
    def get_relationship(self, obj):
        authenticated_user = self.context.get('authenticated_user')

        if authenticated_user is None:
            return "No Authentication"

        if obj.user_id == authenticated_user.user_id:
            return "Self"

        if Link.objects.filter(user_id_to=obj.user, user_id_from=authenticated_user).exists() or \
            Link.objects.filter(user_id_to=authenticated_user, user_id_from=obj.user).exists():
            return "Friends"

        if Request.objects.filter(user_id_from=authenticated_user, user_id_to=obj.user).exists():
            return "Pending Request Sent"

        if Request.objects.filter(user_id_from=obj.user, user_id_to=authenticated_user).exists():
            return "Pending Request Received"

        # If no link or pending request exists
        return "No Connection"

    
