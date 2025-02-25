# profile.py
# this module contains serializer used in APIs for users profile
##########################################################

from rest_framework import serializers
from api.models import Profile, User, Link, Request, Convo, Notification
from django.db.models import Q, F 

# Used for profile information updating
class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['pfp', 'name', 'surname', 'title', 'bio', 'phone', 'website', 'email', 'experience', 'education', "skills","vis_cont", "vis_edu", "vis_exp", "vis_act"]
        
    def update(self, instance, validated_data):
        # Check if a new profile picture
        if 'pfp' in validated_data:
            instance.pfp = validated_data['pfp']  # Save the new profile picture

        for attr, value in validated_data.items():
            if attr != 'pfp':  # pfp is already handled
                setattr(instance, attr, value)
        instance.save()
        return instance
    
# Used for profile viewing
class ProfileSerializer(serializers.ModelSerializer):  
    profile_info = serializers.SerializerMethodField()
    relationship = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ["user_id", 'profile_info','relationship']
        read_only_fields = ['profile_info']


    def get_profile_info(self, obj):
        authenticated_user = self.context.get('authenticated_user')

        # Determine which user is not the authenticated user
        if obj.pfp:
            file_url = "http://127.0.0.1:8000" + obj.pfp.url
        else:
            file_url = "/default.png"
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
            "skills": obj.skills,
            "link_cnt": obj.link_cnt,
            "post_cnt": obj.post_cnt,
            "listings_cnt": obj.listings_cnt,
            "vis_cont": obj.vis_cont,
            "vis_edu": obj.vis_edu,
            "vis_exp": obj.vis_exp,
            "vis_act": obj.vis_act,
            }
        

        vis = 1

        # Check if it is in network
        if Link.objects.filter(user_id_to=obj, user_id_from=authenticated_user.profile).exists() or \
            Link.objects.filter(user_id_to=authenticated_user.profile, user_id_from=obj).exists():
            vis = 2

        

        if obj.vis_exp <= vis:
            exp = obj.experience
        else:
            exp = []
        
        if obj.vis_edu <= vis:
            edu = obj.education
        else:
            edu = []

        if obj.vis_act <= vis:
            skil = obj.skills
        else:
            skil = []
        
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
            "skills": skil,
            "link_cnt": obj.link_cnt,
            "post_cnt": obj.post_cnt,
            "listings_cnt": obj.listings_cnt,
        }

    def get_relationship(self, obj):
        authenticated_user = self.context.get('authenticated_user')

        if authenticated_user is None:
            return "No Authentication"

        if obj.user_id == authenticated_user.user_id:
            return "Self"

        if Link.objects.filter(user_id_to=obj, user_id_from=authenticated_user.profile).exists() or \
            Link.objects.filter(user_id_to=authenticated_user.profile, user_id_from=obj).exists():
            return "Friends"

        if Request.objects.filter(user_id_from=authenticated_user.profile, user_id_to=obj).exists():
            return "Pending Request Sent"

        if Request.objects.filter(user_id_from=obj, user_id_to=authenticated_user.profile).exists():
            return "Pending Request Received"

        return "No Connection"


# Used for fetching profile information as an admin user, regadless of permission
class AdminProfileSerializer(serializers.ModelSerializer):
        user_info = serializers.SerializerMethodField()
        class Meta:
            model = Profile
            fields = ['user_id', 'pfp', 'name', 'surname', 'title', 'bio', 'phone', 'website', 'experience', 'education', 'skills','listings_cnt', "post_cnt", "user_info"]
            
        def get_user_info(self, obj):

            user = User.objects.get(user_id=obj.user_id)

            return {
                "name": user.name,
                "surname": user.surname,
                "email": user.email,
            }
        
# Used for fetching data required for the header
class ProfileHeaderSerializer(serializers.ModelSerializer):
    
    profile_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = ["user_id", 'profile_info']
        read_only_fields = ['user_id']
        
    def get_profile_info(self, obj):
        if obj.pfp:
            file_url = "http://127.0.0.1:8000" + obj.pfp.url
        else:
            file_url = "/default.png"
        
        # Message Badge
        if Convo.objects.filter( ~Q(last_dm=1), Q(user_id1=obj), user_id1_last__lt=F('timestamp')).exists() \
            or Convo.objects.filter( ~Q(last_dm=2), Q(user_id2=obj), user_id2_last__lt=F('timestamp')).exists():
            message = True
        else:
            message = False

        # Notification Badge
        if Request.objects.filter(user_id_to=obj).exists() \
            or Notification.objects.filter(user_to=obj).exists():
            notification = True
        else:
            notification = False
        
        return{
            "pfp": file_url,
            "messages": message,
            "notifications": notification
        }


# Used for fetching profile banner information
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
            file_url = "http://127.0.0.1:8000" + obj.pfp.url
        else:
            file_url = "/default.png"
        
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

        if obj.user_id == authenticated_user.user_id:
            return "Self"

        if Link.objects.filter(user_id_to=obj, user_id_from=authenticated_user).exists() or \
            Link.objects.filter(user_id_to=authenticated_user, user_id_from=obj).exists():
            return "Friends"

        if Request.objects.filter(user_id_from=authenticated_user, user_id_to=obj).exists():
            return "Pending Request Sent"

        if Request.objects.filter(user_id_from=obj, user_id_to=authenticated_user).exists():
            return "Pending Request Received"

        return "No Connection"
    
