# The model was firstly designed in MySQL and later imported here

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.deconstruct import deconstructible
import os
import uuid
from django.utils.timezone import now


def user_directory_path(instance, filename):
    """
    Custom path for storing user profile pictures.
    """
    # Get the file extension of the uploaded file
    ext = filename.split('.')[-1]
    
    # Create a unique filename with user ID, timestamp, and UUID
    filename = f"{instance.user.user_id}_{uuid.uuid4().hex[:8]}.{ext}"
    return os.path.join('pfps', str(instance.user.user_id), filename)


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a regular user with an email and password."""
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser with an email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=45)  # Field name made lowercase.
    surname = models.CharField(max_length=45)  # Field name made lowercase.
    email = models.CharField(unique=True, max_length=45)  # Field name made lowercase.
    country = models.CharField(max_length=45, blank=True, null=True)  # Field name made lowercase.
    city = models.CharField(max_length=45, blank=True, null=True)  # Field name made lowercase.
    phone = models.CharField(max_length=45, blank=True, null=True)  # Field name made lowercase.
    birthdate = models.DateField(blank=True, null=True)  # Field name made lowercase.

    # Django's authentication system stuff #
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'surname']

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)  # Field name made lowercase.
    pfp = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    name = models.CharField(max_length=45)  # Field name made lowercase.
    surname = models.CharField(max_length=45)  # Field name made lowercase.
    title = models.CharField(max_length=45, blank=True, null=True)  # Field name made lowercase.
    bio = models.TextField(blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(max_length=45, null=True)  # Field name made lowercase.
    phone = models.CharField(max_length=20, blank=True, null=True)  # Field name made lowercase.
    website = models.TextField(blank=True, null=True)  # Field name made lowercase.
    experience = models.JSONField(null=True)  # Field name made lowercase.
    education = models.JSONField(null=True)  # Field name made lowercase.
    link_cnt = models.IntegerField(blank=True, default=0)  # Field name made lowercase.
    post_cnt = models.IntegerField(blank=True, default=0)  # Field name made lowercase.
    listings_cnt = models.IntegerField(blank=True, default=0)  # Field name made lowercase.
    vis_exp = models.IntegerField(blank=True, default=1)
    vis_edu = models.IntegerField(blank=True, default=1)
    vis_act = models.IntegerField(blank=True, default=1)
    vis_cont = models.IntegerField(blank=True, default=1)




class Listing(models.Model):
    listing_id = models.AutoField(primary_key=True)  # Field name made lowercase.
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID')  # Field name made lowercase.
    title = models.CharField(max_length=45)  # Field name made lowercase.
    visible = models.IntegerField()  # Field name made lowercase.
    spot = models.CharField(max_length=45)  # Field name made lowercase.
    time = models.CharField(max_length=45)  # Field name made lowercase.
    level = models.CharField(max_length=45)  # Field name made lowercase.
    location = models.CharField(max_length=45, default="No location provided")
    desc = models.TextField()  # Field name made lowercase.
    apl_cnt = models.IntegerField(blank=True, default=0)
    timestamp = models.DateTimeField(auto_now_add=True)  # Field name made lowercase.


class Applied(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID')  # Field name made lowercase. The composite primary key (User_ID, Listing_ID) found, that is not supported. The first column is selected.
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, db_column='Listing_ID')  # Field name made lowercase.

    class Meta:
        unique_together = (('user', 'listing'),)


class Post(models.Model):
    post_id = models.AutoField(db_column='Post_ID', primary_key=True)  # Field name made lowercase.
    user = models.ForeignKey('Profile', on_delete=models.CASCADE, db_column='User_ID')  # Field name made lowercase.
    text = models.TextField()  # Field name made lowercase.
    media = models.BooleanField(default=False)
    links = models.JSONField(blank=True, null=True)  # Field name made lowercase.
    like_cnt = models.IntegerField(default=0)  # Field name made lowercase.
    comment_cnt = models.IntegerField(default=0)  # Field name made lowercase.
    timestamp = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    comment_id = models.AutoField(db_column='Comment_ID', primary_key=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, db_column='Post_ID')  # Field name made lowercase. The composite primary key (Post_ID, User_ID) found, that is not supported. The first column is selected.
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID')  # Field name made lowercase.
    text = models.TextField()  # Field name made lowercase.


class LikedBy(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, db_column='Post_ID')  # Field name made lowercase. The composite primary key (Post_ID, User_ID) found, that is not supported. The first column is selected.
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID')  # Field name made lowercase.

    class Meta:
        unique_together = (('post', 'user'),)

class Convo(models.Model):
    convo_id = models.AutoField(db_column='Convo_ID', primary_key=True)  # Field name made lowercase.
    user_id1 = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID1')  # Field name made lowercase.
    user_id2 = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID2', related_name='convo_user_id2_set')  # Field name made lowercase.
    timestamp = models.DateTimeField(auto_now_add=True)
    user_id1_last = models.DateTimeField(auto_now_add=True)
    user_id2_last = models.DateTimeField(auto_now_add=True)
    last_dm = models.IntegerField(default=0)

# Files are public, creating huge naming scemes to prevent easy access
# THIS IS NOT SECURE, THIS VIOLATES THE SECURITY PRINCIPLE DONT DO SECURITY WITH OBSCURITY
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



class PostMedia(models.Model):
    post_media_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)  # Link the picture to a user
    post = models.ForeignKey(Post, on_delete=models.CASCADE)  # Link the picture to a user
    image = models.ImageField(upload_to=PathAndRename('post-media/'))  # Store the uploaded image

class Dm(models.Model):
    dm_id = models.AutoField(db_column='DM_ID', primary_key=True)  # Field name made lowercase.
    convo = models.ForeignKey(Convo, on_delete=models.CASCADE, db_column='Convo_ID')  # Field name made lowercase.
    media = models.ImageField(upload_to=PathAndRename('dm-media/'), null=True, blank=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column='User_ID')  # Field name made lowercase.
    timestamp = models.DateTimeField(auto_now_add=True)  # Field name made lowercase.
    text = models.TextField( blank=True, null=True)  # Field name made lowercase.

class Link(models.Model):
    user_id_to = models.ForeignKey(Profile, on_delete=models.CASCADE)  # Field name made lowercase. The composite primary key (User_ID_To, User_ID_From) found, that is not supported. The first column is selected.
    user_id_from = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='link_user_id_from_set')  # Field name made lowercase.

    class Meta:
        unique_together = (('user_id_to', 'user_id_from'),)

class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    user_to = models.ForeignKey('Profile', related_name='notifications_received', on_delete=models.CASCADE)  # Field name made lowercase.
    user_from = models.ForeignKey('Profile', related_name='notifications_sent', on_delete=models.CASCADE)  # Field name made lowercase.
    type = models.CharField(max_length=45)  # Field name made lowercase.
    dm_id = models.ForeignKey('Dm', null=True, blank=True, on_delete=models.CASCADE)  # Field name made lowercase.
    like = models.ForeignKey('LikedBy', null=True, blank=True, on_delete=models.CASCADE)
    comment_id = models.ForeignKey('Comment', null=True, blank=True, on_delete=models.CASCADE)
    application = models.ForeignKey('Applied', null=True, blank=True, on_delete=models.CASCADE)
    just_text = models.CharField(max_length=45, null=True, blank=True)

class Request(models.Model):
    user_id_from = models.ForeignKey(Profile, on_delete=models.CASCADE)  # Field name made lowercase. The composite primary key (User_ID_From, User_ID_To) found, that is not supported. The first column is selected.
    user_id_to = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='request_user_id_to_set')  # Field name made lowercase.

    class Meta:
        unique_together = (('user_id_from', 'user_id_to'),)
