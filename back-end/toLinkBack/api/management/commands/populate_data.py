import json
import os
import random
from django.core.management.base import BaseCommand
from api.serializers import UserSerializer, ListingSerializer
from api.models import User, Profile, Post, LikedBy, Listing, Applied  # Import your models
from django.db.models import F

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

        with open("./mockdata/User_Profile_MOCK.json", 'r') as file:
            data = json.load(file)

            # Iterate through the data and create models
            for entry in data:

                request = {
                    'name': entry['name'],
                    'surname': entry['surname'],
                    'country': entry['country'],
                    'city': entry['city'],
                    'phone': entry['phone'],
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
        self.stdout.write(f'Data from User_Profile_MOCK.json loaded successfully.')

        self.stdout.write(f'Loading data from Post_MOCK.json ...')

        with open("./mockdata/Post_MOCK.json", 'r') as file:
            data = json.load(file)

            # Iterate through the data and create models
            for entry in data:
                profile = Profile.objects.get(user_id=entry["user"])
                # Assuming the data is structured for the User model
                post = Post.objects.create(
                    user=profile,
                    text=entry['text']
                )

                random_likes = random.randint(0, 66)

                for i in range(random_likes):
                    user = random.randint(2, 101)
                    profile = Profile.objects.get(user_id=user)
                    LikedBy.objects.create(
                        user=profile,
                        post=post
                    )
                

                random_comments = random.randint(0, 23)

                for i in range(random_comments):
                    user = random.randint(2, 101)
                    profile = Profile.objects.get(user_id=user)
                    LikedBy.objects.create(
                        user=profile,
                        post=post,
                        text="This is so me"
                    )
                    

        self.stdout.write(f'Data from Post_MOCK.json loaded successfully.')


        self.stdout.write(f'Loading data from Listing_MOCK.json ...')

        with open("./mockdata/Listing_MOCK.json", 'r') as file:
            data = json.load(file)

            # Iterate through the data and create models
            for entry in data:

                profile = Profile.objects.get(user_id=entry["user"])
                listing = Listing.object.create(
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

                self.stdout.write(self.style.SUCCESS(f'Created post of {user.email}'))

                random_apl = random.randint(0, 22)

                for i in range(random_apl):
                    user = random.randint(2, 101)
                    if user != entry['user']:
                        profile = Profile.objects.get(user_id=user)
                        Applied.objects.create(
                            user=profile,
                            listing=listing
                        )
                


                # Optionally create a profile for each user
                Profile.objects.get_or_create(
                    user=user,
                    defaults={
                        'name': user.name,
                        'surname': user.surname,
                        'email': user.email,
                        'title': entry['title'],
                        'skills': entry['skills'],
                        'education': entry['education'],
                        'experience': entry['experience']
                    }
                )

        self.stdout.write(f'Data from Listing_MOCK.json loaded successfully.')