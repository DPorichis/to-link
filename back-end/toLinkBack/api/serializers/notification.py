from rest_framework import serializers
from api.models import Notification, Profile, Post, Listing

class NotificationSerializer(serializers.ModelSerializer):

    notification_content = serializers.SerializerMethodField()
    class Meta:
        model = Notification
        fields = ["notification_id" ,"user_id_to", 'notification_content', "user_id_from"]
        read_only_fields = ["user_id_to"]

    def get_notification_content(self, obj):
        # Fetch the profile associated with the other user
        other_user_profile = Profile.objects.get(user=obj.user_id_from)

        if other_user_profile.pfp:
            # Access the file if it exists
            file_url = "http://127.0.0.1:8000" + obj.pfp.url
        else:
            # Handle the case where no file is uploaded
            file_url = "/default.png"

        if(obj.type == "like"):
            text = other_user_profile.name + " " + other_user_profile.surname + "liked your post"
            post = Post.objects.get(post_id=obj.post)
            if(post.text != ""):
                if len(post.text) > 15:
                    text += " about \"" + post.text + "\""
                else:
                    text += " about \" " + post.text[:15] + "... \""
        elif(obj.type == "comment"):
            text = other_user_profile.name + " " + other_user_profile.surname + "commented \"" + obj.text + "\" on your post"
            post = Post.objects.get(post_id=obj.post)
            if(post.text != ""):
                if len(post.text) > 15:
                    text += " about \"" + post.text + "\""
                else:
                    text += " about \" " + post.text[:15] + "... \""
        elif(obj.type == "application"):
            text = other_user_profile.name + " " + other_user_profile.surname + "applied to your job listing"
            listing = Listing.objects.get(post_id=obj.application.listing)
            if(listing.title != ""):
                text += " \"" + listing.title + "\""
        else:
            text = "Idk why this notification exists to be honest"

        return {
            'pfp': file_url,
            'user_id': other_user_profile.user.user_id,
            'text': text
        }