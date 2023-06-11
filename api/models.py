from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class CustomUser(AbstractUser):
    email = models.EmailField(
        max_length=256, blank=True, null=True)
    first_name = models.CharField(
        max_length=256, blank=True, null=True)
    last_name = models.CharField(
        max_length=256, blank=True, null=True)
    username = models.CharField(
        max_length=256, unique=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Users"

    def __str__(self):
        return f'{self.username}'


class Category(models.Model):
    title = models.CharField(max_length=256)
    SUPER_CATEGORY = [("head", "Head"), ("top", "Top"), ("bottom",
                                                            "Bottom"), ("foot", "Foot"), ("extra", "Extra")]
    super = models.CharField(
        max_length=20, choices=SUPER_CATEGORY, default="top")
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE, blank=True, null=True
    )

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return f'{self.title}'


class Brand(models.Model):
    title = models.CharField(max_length=256)
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE, blank=True, null=True
    )

    class Meta:
        verbose_name_plural = "Brands"

    def __str__(self):
        return f'{self.title}'


class Color(models.Model):
    title = models.CharField(max_length=256)
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE, blank=True, null=True
    )

    class Meta:
        verbose_name_plural = "Colors"

    def __str__(self):
        return f'{self.title}'


class Apparel(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE, blank=False, null=False
    )
    note = models.TextField(null=True, blank=True)
    processed = models.TextField(null=False, blank=False)
    additional = models.TextField(null=False, blank=False)
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE, blank=True, null=True
    )

    class Meta:
        verbose_name_plural = "Apparels"

    def __str__(self):
        return f'{self.category}'

class Outfit(models.Model):
    top = models.ForeignKey(
        Apparel,
        on_delete=models.CASCADE, related_name='tops'
    )
    bottom = models.ForeignKey(
        Apparel,
        on_delete=models.CASCADE, related_name='bottoms'
    )
    foot = models.ForeignKey(
        Apparel,
        on_delete=models.CASCADE, related_name='footwear'
    )
    isApproved = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Outfits"

    def __str__(self):
        return f'{self.top} {self.bottom} {self.foot}'
