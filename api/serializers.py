from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password as django_validate_pwd
from .models import Note
from rest_framework import serializers


class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            'id',
            'head',
            'desc',
            'timestamp'
        ]


class UsersSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = [
            'username',
            'password'
        ]

    def validate_password(self, value):
        django_validate_pwd(value)
        return value

    def create(self, validated_data):
        model = get_user_model()
        user = model.objects.create(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user