from rest_framework import serializers
from api.models import Profile


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['pfp', 'name', 'surname', 'title', 'bio', 'phone', 'website', 'experience', 'education']
        # Add any other fields you want to be updatable

    def update(self, instance, validated_data):
        # Loop through the validated data and set it to the instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance