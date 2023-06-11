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

class ViewCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = "__all__"


class ViewBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Brand
        fields = "__all__"


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Brand
        fields = "__all__"


class ViewColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Color
        fields = "__all__"


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Color
        fields = "__all__"


class ViewApparelSerializer(serializers.ModelSerializer):
    category = ViewCategorySerializer()
    class Meta:
        model = models.Apparel
        fields = "__all__"


class ApparelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Apparel
        fields = "__all__"

class OutfitSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Outfit
        fields = "__all__"
