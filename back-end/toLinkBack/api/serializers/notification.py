# notifications.py
# this module contains serializer used in APIs for notifications
#################################################################


from rest_framework import serializers
from api.models import Notification, Profile, Post, Listing

# Used to create the notification info present in banners
class NotificationSerializer(serializers.ModelSerializer):

    notification_content = serializers.SerializerMethodField()
    class Meta:
        model = Notification
        fields = ["notification_id" ,"user_to", 'notification_content', "user_from"]
        read_only_fields = ["user_to"]

    def get_notification_content(self, obj):
        other_user_profile = Profile.objects.get(user=obj.user_from)

        if other_user_profile.pfp:
            file_url = "http://127.0.0.1:8000" + other_user_profile.pfp.url
        else:
            file_url = "/default.png"

        if(obj.type == "like"):
            text = other_user_profile.name + " " + other_user_profile.surname + " liked your post"
            post = Post.objects.get(post_id=obj.like.post.post_id)
            if(post.text != ""):
                if len(post.text) < 15:
                    text += " about \"" + post.text + "\""
                else:
                    text += " about \"" + post.text[:15] + "... \""
        elif(obj.type == "comment"):
            text = other_user_profile.name + " " + other_user_profile.surname + " commented \"" + obj.comment_id.text + "\" on your post"
            post = Post.objects.get(post_id=obj.comment_id.post.post_id)
            if(post.text != ""):
                if len(post.text) < 15:
                    text += " about \"" + post.text + "\""
                else:
                    text += " about \"" + post.text[:15] + "... \""
        elif(obj.type == "application"):
            text = other_user_profile.name + " " + other_user_profile.surname + " applied to your job listing"
            listing = Listing.objects.get(listing_id=obj.application.listing.listing_id)
            if(listing.title != ""):
                text += " \"" + listing.title + "\""
        else:
            text = "Idk why this notification exists to be honest"

        return {
            'pfp': file_url,
            'user_id': other_user_profile.user.user_id,
            'text': text
        }