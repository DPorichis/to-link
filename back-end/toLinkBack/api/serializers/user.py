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
    