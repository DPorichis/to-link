from rest_framework import serializers
from api.models import Profile, User,Link,Request
from django.db.models import Q  


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['pfp', 'name', 'surname', 'title', 'bio', 'phone', 'website', 'email', 'experience', 'education', "vis_cont", "vis_edu", "vis_exp", "vis_act"]
        # Add any other fields you want to be updatable

    def update(self, instance, validated_data):
        # Check if a new profile picture (pfp) is provided
        if 'pfp' in validated_data:
            instance.pfp = validated_data['pfp']  # Save the new profile picture

        # Loop through the other validated data fields and update the instance
        for attr, value in validated_data.items():
            if attr != 'pfp':  # pfp is already handled, skip it here
                setattr(instance, attr, value)
        instance.save()
        return instance
    
class ProfileSerializer(serializers.ModelSerializer):
    
    profile_info = serializers.SerializerMethodField()
    relationship = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ["user_id", 'profile_info','relationship']
        read_only_fields = ['profile_info']
        # Add any other fields you want to be updatable


    def get_profile_info(self, obj):
        # Get the authenticated user from the context
        authenticated_user = self.context.get('authenticated_user')

        # Determine which user is not the authenticated user

        if obj.pfp:
            # Access the file if it exists
            file_url = "http://127.0.0.1:8000" + obj.pfp.url
        else:
            # Handle the case where no file is uploaded
            file_url = "/default.png"  # or set a default image
        if obj.user_id == authenticated_user.user_id:
            return{
            "pfp": file_url,
            "name": obj.name,
            "surname": obj.surname,
            "title": obj.title,
            "bio": obj.bio,
            "email": obj.email,
            "phone": obj.phone,
            "website": obj.website,
            "experience": obj.experience, 
            "education": obj.education,
            "link_cnt": obj.link_cnt,
            "post_cnt": obj.post_cnt,
            "listings_cnt": obj.listings_cnt,
            "vis_cont": obj.vis_cont,
            "vis_edu": obj.vis_edu,
            "vis_exp": obj.vis_exp,
            "vis_act": obj.vis_act,
            }
        
        # Check if it is in network
        vis = 3

        if obj.vis_exp <= vis:
            exp = obj.experience
        else:
            exp = {}
        
        if obj.vis_edu <= vis:
            edu = obj.education
        else:
            edu = {}
        
        if obj.vis_cont <= vis:
            email = obj.email
            phone = obj.phone
            website = obj.phone
        else:
            email = ""
            phone = ""
            website = ""

        return{
            "pfp": file_url,
            "name": obj.name,
            "surname": obj.surname,
            "title": obj.title,
            "bio": obj.bio,
            "email": email,
            "phone": phone,
            "website": website,
            "experience": exp, 
            "education": edu,
            "link_cnt": obj.link_cnt,
            "post_cnt": obj.post_cnt,
            "listings_cnt": obj.listings_cnt,
        }

    def get_relationship(self, obj):
        authenticated_user = self.context.get('authenticated_user')

        if authenticated_user is None:
            return "No Authentication"

        # Check if the authenticated user is the same as the object user
        if obj.user_id == authenticated_user.user_id:
            return "Self"

        # Check for an established link (friendship)
        if Link.objects.filter(user_id_to=obj, user_id_from=authenticated_user.profile).exists() or \
            Link.objects.filter(user_id_to=authenticated_user.profile, user_id_from=obj).exists():
            return "Friends"

        # Check for a pending friend request from the authenticated user to the obj
        if Request.objects.filter(user_id_from=authenticated_user.profile, user_id_to=obj).exists():
            return "Pending Request Sent"

        # Check for a pending friend request from the obj to the authenticated user
        if Request.objects.filter(user_id_from=obj, user_id_to=authenticated_user.profile).exists():
            return "Pending Request Received"

        # If no link or pending request exists
        return "No Connection"



class AdminProfileSerializer(serializers.ModelSerializer):
        user_info = serializers.SerializerMethodField()
        class Meta:
            model = Profile
            fields = ['user_id', 'pfp', 'name', 'surname', 'title', 'bio', 'phone', 'website', 'experience', 'education', 'listings_cnt', "post_cnt", "user_info"]
            # Add any other fields you want to be updatable


        def get_user_info(self, obj):

            user = User.objects.get(user_id=obj.user_id)

            return {
                "name": user.name,
                "surname": user.surname,
                "email": user.email,
            }

class ProfileBannerSerializer(serializers.ModelSerializer):
    
    profile_info = serializers.SerializerMethodField()
    relationship = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ["user_id", 'profile_info','relationship']
        read_only_fields = ['user_id']
        
    def get_profile_info(self, obj):
        authenticated_user = self.context.get('authenticated_user')
        
        if obj.pfp:
            # Access the file if it exists
            file_url = "http://127.0.0.1:8000" + obj.pfp.url
        else:
            # Handle the case where no file is uploaded
            file_url = "/default.png"  # or set a default image
        
        return{
        "pfp": file_url,
        "name": obj.name,
        "surname": obj.surname,
        "title": obj.title,
        }
    
    def get_relationship(self, obj):
        authenticated_user = self.context.get('authenticated_user')

        if authenticated_user is None:
            return "No Authentication"

        # Check if the authenticated user is the same as the object user
        if obj.user_id == authenticated_user.user_id:
            return "Self"

        # Check for an established link (friendship)
        if Link.objects.filter(user_id_to=obj, user_id_from=authenticated_user).exists() or \
            Link.objects.filter(user_id_to=authenticated_user, user_id_from=obj).exists():
            return "Friends"

        # Check for a pending friend request from the authenticated user to the obj
        if Request.objects.filter(user_id_from=authenticated_user, user_id_to=obj).exists():
            return "Pending Request Sent"

        # Check for a pending friend request from the obj to the authenticated user
        if Request.objects.filter(user_id_from=obj, user_id_to=authenticated_user).exists():
            return "Pending Request Received"

        # If no link or pending request exists
        return "No Connection"