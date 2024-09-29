import json
import os
import random
from django.core.management.base import BaseCommand
from api.serializers import UserSerializer, ListingSerializer
from api.models import User, Profile, Post, LikedBy, PostViews, Listing, Applied, ListingViews, Link, Convo, Comment  # Import your models
from django.db.models import F
from django.db import IntegrityError

class Command(BaseCommand):
    help = 'Populates the database with data from JSON files'

    def handle(self, *args, **kwargs):
        # Path to your JSON files
        json_files = [
            './mockdata/User_Profile_MOCK.json',
            './mockdata/Post_MOCK.json',
            './mockdata/Listing_MOCK.json'
        ]

        self.stdout.write(f'Loading data from User_Profile_MOCK.json ...')

        with open("./api/management/commands/mockdata/User_Profile_MOCK.json", 'r', encoding='utf-8') as file:
            data = json.load(file)

            for entry in data:

                request = {
                    'name': entry['name'],
                    'surname': entry['surname'],
                    'email': entry['email'],
                    'country': entry['country'],
                    'city': entry['city'],
                    'birthdate': entry['birthdate'],
                    'password': entry['password']
                }
    
                user_serializer = UserSerializer(data=request)
                if user_serializer.is_valid():
                    user = user_serializer.save()

                    # Create a corresponding profile for the new user
                    Profile.objects.create(
                        user_id=user.user_id,  # Link the profile to the new user
                        name=user.name,
                        surname=user.surname,
                        email=user.email,
                        title=entry['title'],
                        skills=entry['skills'],
                        education=entry['education'],
                        experience=entry['experience']
                    )
                    print("user created")
                else:
                    print(user_serializer.errors)

            # Create some connections for each user
            for u1 in range(100):
                profile_from = Profile.objects.get(user_id=u1+1)
                for u2 in range(5):
                    user_id = (u2 + u1) % 100  + 2
                    print(user_id)
                    profile_to = Profile.objects.get(user_id=user_id)
                    if (profile_to != profile_from):
                        Link.objects.create(user_id_from=profile_from, user_id_to=profile_to)
                        Convo.objects.create(user_id1=profile_from, user_id2=profile_to)

                        profile_to.link_cnt = F('link_cnt') + 1
                        profile_to.save(update_fields=['link_cnt'])

                        profile_from.link_cnt = F('link_cnt') + 1
                        profile_from.save(update_fields=['link_cnt'])
                
        self.stdout.write(f'Data from User_Profile_MOCK.json loaded successfully.')

        self.stdout.write(f'Loading data from Post_MOCK.json ...')

        with open("./api/management/commands/mockdata/Post_MOCK.json", 'r', encoding='utf-8') as file:
            data = json.load(file)

            for entry in data:
                print("post")
                # Create the posts
                profile = Profile.objects.get(user_id=entry["user"])
                post = Post.objects.create(
                    user=profile,
                    text=entry['text']
                )
                
                profile.post_cnt = F('post_cnt') + 1
                profile.save(update_fields=['post_cnt'])

                # Create some random likes
                random_likes = random.randint(0, 66)
                for i in range(random_likes):
                    user = random.randint(2, 101)
                    profile = Profile.objects.get(user_id=user)
                    try:
                        LikedBy.objects.create(
                            user=profile,
                            post=post
                        )
                        post.like_cnt = F('like_cnt') + 1
                        post.save(update_fields=['like_cnt'])
                    except IntegrityError:
                        # Handle the case where the like already exists
                        print("Like already exists. (Most likely bad luck)")
                
                # Create some random comments
                random_comments = random.randint(0, 23)
                for i in range(random_comments):
                    user = random.randint(2, 101)
                    profile = Profile.objects.get(user_id=user)
                    Comment.objects.create(
                        user=profile,
                        post=post,
                        text="This is so me"
                    )
                    post.comment_cnt = F('comment_cnt') + 1
                    post.save(update_fields=['comment_cnt'])
                    
                # Create some random views
                random_views = random.randint(0, 90)
                for i in range(random_views):
                    user = random.randint(2, 101)
                    profile = Profile.objects.get(user_id=user)
                    try:
                        PostViews.objects.create(
                            user=profile,
                            post=post
                        )
                    except IntegrityError:
                        # Handle the case where the like already exists
                        print("View already exists. (Most likely bad luck)")

        self.stdout.write(f'Data from Post_MOCK.json loaded successfully.')


        self.stdout.write(f'Loading data from Listing_MOCK.json ...')

        with open("./api/management/commands/mockdata/Listings_MOCK.json", 'r', encoding='utf-8') as file:
            data = json.load(file)

            for entry in data:

                profile = Profile.objects.get(user_id=entry["user"])
                # Create the listings
                listing = Listing.objects.create(
                    user=profile,
                    title=entry['title'],
                    visible=entry['visible'],
                    spot=entry['spot'],
                    time=entry['time'],
                    level=entry['level'],
                    location=entry['location'],
                    desc=entry['desc'],
                    skills=entry['skills']
                )

                profile.listings_cnt = F('listings_cnt') + 1
                profile.save(update_fields=['listings_cnt'])

                self.stdout.write(self.style.SUCCESS(f'Created post of {profile.email}'))

                # Create some random applications
                random_apl = random.randint(0, 22)
                for i in range(random_apl):
                    user = random.randint(2, 101)
                    if user != entry['user']:
                        profile = Profile.objects.get(user_id=user)
                        try:
                            Applied.objects.create(
                                user=profile,
                                listing=listing
                            )
                        except IntegrityError:
                            # Handle the case where the like already exists or other integrity issues occur
                            print("Application already exists.")

                # Create some random views
                random_views = random.randint(0, 90)
                for i in range(random_views):
                    user = random.randint(2, 101)
                    profile = Profile.objects.get(user_id=user)
                    try:
                        ListingViews.objects.create(
                            user=profile,
                            listing=listing
                        )
                    except IntegrityError:
                        # Handle the case where the like already exists
                        print("View creation error")
      
        self.stdout.write(f'Data from Listing_MOCK.json loaded successfully.')