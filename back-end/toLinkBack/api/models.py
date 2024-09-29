# The model was firstly designed in MySQL and later imported here

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

# Many things where modified from the script

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.deconstruct import deconstructible
from django.core.exceptions import ValidationError
import os
import uuid
from django.utils.timezone import now

# Custom paths for profile picture storage
def user_directory_path(instance, filename):
    
    # Get the file extension of the uploaded file
    ext = filename.split('.')[-1]
    
    # Create a unique filename with user ID, timestamp, and UUID
    filename = f"{instance.user.user_id}_{uuid.uuid4().hex[:8]}.{ext}"
    return os.path.join('pfps', str(instance.user.user_id), filename)


class CustomUserManager(BaseUserManager):
    # Regular user creation
    def create_user(self, email, password=None, **extra_fields):
        
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    # Super user creation
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)
    surname = models.CharField(max_length=45)
    email = models.CharField(unique=True, max_length=45)
    country = models.CharField(max_length=45, blank=True, null=True)
    city = models.CharField(max_length=45, blank=True, null=True)
    phone = models.CharField(max_length=45, blank=True, null=True)
    birthdate = models.DateField(blank=True, null=True)

    # Django's authentication system stuff #
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'surname']

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    pfp = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    name = models.CharField(max_length=45) # Profile and User name may differ (that's by design)
    surname = models.CharField(max_length=45) # Profile and User surname may differ (that's by design)
    title = models.CharField(max_length=45, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    email = models.CharField(max_length=45, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    website = models.TextField(blank=True, null=True)
    experience = models.JSONField(null=True)
    education = models.JSONField(null=True)
    skills = models.JSONField(null=True)
    link_cnt = models.IntegerField(blank=True, default=0)  # These counters only serve dummy purposes, don't take them to seriously
    post_cnt = models.IntegerField(blank=True, default=0)  # These counters only serve dummy purposes, don't take them to seriously
    listings_cnt = models.IntegerField(blank=True, default=0)  # These counters only serve dummy purposes, don't take them to seriously
    vis_exp = models.IntegerField(blank=True, default=1)
    vis_edu = models.IntegerField(blank=True, default=1)
    vis_act = models.IntegerField(blank=True, default=1)
    vis_cont = models.IntegerField(blank=True, default=1)

class Listing(models.Model):
    listing_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID')
    title = models.CharField(max_length=45)
    visible = models.IntegerField()
    spot = models.CharField(max_length=45)
    time = models.CharField(max_length=45)
    level = models.CharField(max_length=45)
    location = models.CharField(max_length=45, default="No location provided")
    desc = models.TextField()
    skills = models.JSONField(null=True)
    apl_cnt = models.IntegerField(blank=True, default=0) # These counters only serve dummy purposes, don't take them to seriously
    timestamp = models.DateTimeField(auto_now_add=True)

# Tracking Users 101
class ListingViews(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class Applied(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID')
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, db_column='Listing_ID')

    class Meta:
        unique_together = (('user', 'listing'),)

# This table gets filled by the recommendation agent
class ListingRecom(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, db_column='Listing_ID')  
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID')

class Post(models.Model):
    post_id = models.AutoField(db_column='Post_ID', primary_key=True)
    user = models.ForeignKey('Profile', on_delete=models.CASCADE, db_column='User_ID')
    text = models.TextField(default="")
    media = models.BooleanField(default=False) # This is used to check PostMedia for the media or not
    like_cnt = models.IntegerField(default=0) # These counters only serve dummy purposes, don't take them to seriously
    comment_cnt = models.IntegerField(default=0)  # These counters only serve dummy purposes, don't take them to seriously
    timestamp = models.DateTimeField(auto_now_add=True)

# Tracking users 101
class PostViews(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    
class Comment(models.Model):
    comment_id = models.AutoField(db_column='Comment_ID', primary_key=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, db_column='Post_ID')
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID')
    text = models.TextField()

class LikedBy(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, db_column='Post_ID')
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID')

    class Meta:
        unique_together = (('post', 'user'),)

# This table gets filled by the recommendation agent
class PostRecom(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, db_column='Post_ID')  
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID')  

class Convo(models.Model):
    convo_id = models.AutoField(db_column='Convo_ID', primary_key=True)
    user_id1 = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID1')
    user_id2 = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID2', related_name='convo_user_id2_set')
    timestamp = models.DateTimeField(auto_now_add=True)
    user_id1_last = models.DateTimeField(auto_now_add=True) # tracking last seen
    user_id2_last = models.DateTimeField(auto_now_add=True) # tracking last seen
    last_dm = models.IntegerField(default=0)

# Files are public, creating huge naming scemes to prevent easy access
# Platforms like Discord use the same mechanic, it's not super secure tho
@deconstructible
class PathAndRename:
    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        # Create a new unique filename using UUID
        new_filename = f"{uuid.uuid4()}.{ext}"
        # Return the full path to the media folder
        return os.path.join(self.path, new_filename)


# Contains Media for posts
class PostMedia(models.Model):
    MEDIA_TYPE_CHOICES = (
        ('image', 'Image'),
        ('video', 'Video'),
        ('audio', 'Audio'),
    )

    post_media_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    media_type = models.CharField(max_length=5, choices=MEDIA_TYPE_CHOICES) # Shows where to look
    image = models.ImageField(upload_to=PathAndRename('post-media/images'), blank=True, null=True)
    video = models.FileField(upload_to=PathAndRename('post-media/videos/'), blank=True, null=True)
    audio = models.FileField(upload_to=PathAndRename('post-media/audios/'), blank=True, null=True)

    def clean(self):
        media_fields = [self.image, self.video, self.audio]
        media_count = sum(1 for field in media_fields if field)

        if media_count > 1:
            raise ValidationError("Multiple Media Types are not allowed")
        elif media_count == 0:
            raise ValidationError("No media uploaded.")

class Dm(models.Model):
    dm_id = models.AutoField(db_column='DM_ID', primary_key=True)
    convo = models.ForeignKey(Convo, on_delete=models.CASCADE, db_column='Convo_ID')
    media = models.ImageField(upload_to=PathAndRename('dm-media/'), null=True, blank=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID')
    timestamp = models.DateTimeField(auto_now_add=True)
    text = models.TextField( blank=True, null=True)


class Link(models.Model):
    # Double search is needed (from-to, to-from)
    user_id_to = models.ForeignKey(Profile, on_delete=models.CASCADE)
    user_id_from = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='link_user_id_from_set')

    class Meta:
        unique_together = (('user_id_to', 'user_id_from'),)

class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    user_to = models.ForeignKey('Profile', related_name='notifications_received', on_delete=models.CASCADE)
    user_from = models.ForeignKey('Profile', related_name='notifications_sent', on_delete=models.CASCADE)
    type = models.CharField(max_length=45) # Shows where to look
    dm_id = models.ForeignKey('Dm', null=True, blank=True, on_delete=models.CASCADE)
    like = models.ForeignKey('LikedBy', null=True, blank=True, on_delete=models.CASCADE)
    comment_id = models.ForeignKey('Comment', null=True, blank=True, on_delete=models.CASCADE)
    application = models.ForeignKey('Applied', null=True, blank=True, on_delete=models.CASCADE)
    just_text = models.CharField(max_length=45, null=True, blank=True)

class Request(models.Model):
    user_id_from = models.ForeignKey(Profile, on_delete=models.CASCADE)
    user_id_to = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='request_user_id_to_set')

    class Meta:
        unique_together = (('user_id_from', 'user_id_to'),)
