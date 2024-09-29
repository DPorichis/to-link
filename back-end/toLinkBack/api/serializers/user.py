# users.py
# this module contains serializer used in APIs for users data
##########################################################


from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from api.models import User, Profile

# User Creation
class UserSerializer(serializers.ModelSerializer):
  
    password = serializers.CharField(write_only=True)  # Ensure password is write-only

    class Meta:
        model = User
        fields = ["name", "surname", "email", "country", "city", "phone", "birthdate", "password"]

    def create(self, validated_data):
        # Hash the password before saving the user
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # handles password hashing
        user.save()
        return user

# Debugging
class CustomIntegerField(serializers.IntegerField):
    def to_internal_value(self, value):
        if value in [None, '']:
            return None 
        return super().to_internal_value(value)

# User updating
class UserUpdateSerializer(serializers.ModelSerializer):    
    class Meta:
        model = User
        fields = ["name", "surname", "email", "country", "city", "phone", "birthdate"]
        
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
                setattr(instance, attr, value)
        instance.save()
        return instance