from rest_framework import serializers
from api.models import Profile, Listing, Applied, Link, Request

class ListingSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Listing
        fields = ['listing_id', 'user', 'title', 'visible', 'spot', 'time', 'level', 'desc', 'skills', 'location', 'timestamp', 'user_info', 'apl_cnt']
        read_only_fields = ['listing_id', 'user', 'timestamp', 'user_info', 'apl_cnt']
        # Add any other fields you want to be updatable
            
    def create(self, validated_data):
        # This method will be used in the view to create a new post with the user set manually
        user = validated_data.pop('user', None)  # Extract the user from validated_data if present
        post = Listing.objects.create(**validated_data, user=user)
        return post

    def get_user_info(self, obj):
        # Get the authenticated user from the context
        other_user = obj.user

        # Fetch the profile associated with the other user
        profile = Profile.objects.get(user_id=other_user)

        return {
            'name': profile.name,
            'surname': profile.surname,
            'title': profile.title
        }



class ListingUpdateSerializer(serializers.ModelSerializer):
    
    user_info = serializers.SerializerMethodField()

    class Meta:
        model = Listing
        fields = ['listing_id', 'user', 'title', 'visible', 'spot', 'time', 'level', 'desc', 'skills', 'location', 'timestamp', 'user_info', 'apl_cnt']
        read_only_fields = ['listing_id', 'user', 'timestamp', 'user_info', 'apl_cnt']
        # Add any other fields you want to be updatable

    def update(self, instance, validated_data):
        # Loop through the validated data and set it to the instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
    def get_user_info(self, obj):
        # Get the authenticated user from the context
        other_user = obj.user

        # Fetch the profile associated with the other user
        profile = Profile.objects.get(user_id=other_user)

        return {
            'name': profile.name,
            'surname': profile.surname,
            'title': profile.title
        }
    
class AppliedSerializer(serializers.ModelSerializer):
    profile_info = serializers.SerializerMethodField()
    relationship = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField() # Not optimal at ALL
    class Meta:
        model = Applied
        fields = ['user', 'profile_info', 'relationship', 'user_id']
        read_only_fields = ['user', 'profile_info', 'relationship', 'user_id']
        # Add any other fields you want to be updatable

    def get_profile_info(self, obj):
        if obj.user.pfp:
            # Access the file if it exists
            file_url = "http://127.0.0.1:8000" + obj.user.pfp.url
        else:
            # Handle the case where no file is uploaded
            file_url = "/default.png"  # or set a default image
        
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

        # Check for an established link (friendship)
        if Link.objects.filter(user_id_to=obj.user, user_id_from=authenticated_user).exists() or \
            Link.objects.filter(user_id_to=authenticated_user, user_id_from=obj.user).exists():
            return "Friends"

        # Check for a pending friend request from the authenticated user to the obj
        if Request.objects.filter(user_id_from=authenticated_user, user_id_to=obj.user).exists():
            return "Pending Request Sent"

        # Check for a pending friend request from the obj to the authenticated user
        if Request.objects.filter(user_id_from=obj.user, user_id_to=authenticated_user).exists():
            return "Pending Request Received"

        # If no link or pending request exists
        return "No Connection"

    
