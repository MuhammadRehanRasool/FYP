from rest_framework import serializers
from . import models


class UsersSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = models.CustomUser
        fields = (
            'id',
            'password',
            'userType',
            'firstName',
            'lastName',
            'username',
            'gender',
            'dateOfBirth',
            'phoneNumber',
            'email',
            'country',
            'state',
            'street',
            'existingConditions',
            'allergies',
            'currentMedications',
            'days',
            'hours',
            'speciality',
            'affiliation',
        )
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
            'id',
            'timestamp',
            'userType',
            'firstName',
            'lastName',
            'username',
            'gender',
            'dateOfBirth',
            'phoneNumber',
            'email',
            'country',
            'state',
            'street',
            'existingConditions',
            'allergies',
            'currentMedications',
            'days',
            'hours',
            'speciality',
            'affiliation',
        )


# class ViewCategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Category
#         fields = "__all__"
