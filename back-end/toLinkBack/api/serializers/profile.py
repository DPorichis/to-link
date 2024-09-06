from rest_framework import serializers
from api.models import Profile


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['pfp', 'name', 'surname', 'title', 'bio', 'phone', 'website', 'email', 'experience', 'education', "vis_cont", "vis_edu", "vis_exp", "vis_act"]
        # Add any other fields you want to be updatable

    def update(self, instance, validated_data):
        # Loop through the validated data and set it to the instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
class ProfileSerializer(serializers.ModelSerializer):
    
    profile_info = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ["user_id", 'profile_info']
        read_only_fields = ['profile_info']
        # Add any other fields you want to be updatable


    def get_profile_info(self, obj):
        # Get the authenticated user from the context
        authenticated_user = self.context.get('authenticated_user')

        # Determine which user is not the authenticated user
        if obj.user_id == authenticated_user.user_id:
            return{
            "pfp": obj.pfp,
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
            "pfp": obj.pfp,
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


class AdminProfileSerializer(serializers.ModelSerializer):
        class Meta:
            model = Profile
            fields = ['pfp', 'name', 'surname', 'title', 'bio', 'phone', 'website', 'experience', 'education']
            # Add any other fields you want to be updatable