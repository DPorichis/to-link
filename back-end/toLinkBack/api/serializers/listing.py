from rest_framework import serializers
from api.models import Profile, Listing, Applied

class ListingSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Listing
        fields = ['listing_id', 'user', 'title', 'visible', 'spot', 'time', 'level', 'desc', 'location', 'timestamp', 'user_info', 'apl_cnt']
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
    
    class Meta:
        model = Listing
        fields = ['listing_id', 'user', 'title', 'visible', 'spot', 'time', 'level', 'desc', 'location']
        read_only_fields = ['listing_id', 'user']
        # Add any other fields you want to be updatable

    def update(self, instance, validated_data):
        # Loop through the validated data and set it to the instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
class AppliedSerializer(serializers.ModelSerializer):
    user_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Applied
        fields = ['user', 'listing', 'user_info']
        read_only_fields = ['user', 'user_info']
        # Add any other fields you want to be updatable

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

    
