from rest_framework import serializers
from . import models


class UsersSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = models.CustomUser
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class ViewUsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CustomUser
        fields = (
            "id",
            'username',
            "timestamp",
        )

# class ViewCategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Category
#         fields = "__all__"

