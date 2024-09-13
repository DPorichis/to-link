from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from api.models import User, Profile

class UserSerializer(serializers.ModelSerializer):
  
    password = serializers.CharField(write_only=True)  # Ensure password is write-only

    class Meta:
        model = User
        fields = ["name", "surname", "email", "country", "city", "phone", "birthdate", "password"]

    def create(self, validated_data):
        # Hash the password before saving the user
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # This method handles password hashing
        user.save()
        return user


class CustomIntegerField(serializers.IntegerField):
    def to_internal_value(self, value):
        if value in [None, '']:
            return None  # Convert empty string or null to None
        return super().to_internal_value(value)

class UserUpdateSerializer(serializers.ModelSerializer):    
    class Meta:
        model = User
        fields = ["name", "surname", "email", "country", "city", "phone", "birthdate"]
        # Add any other fields you want to be updatable

    def update(self, instance, validated_data):
        # Loop through the other validated data fields and update the instance
        for attr, value in validated_data.items():
                setattr(instance, attr, value)
        instance.save()
        return instance