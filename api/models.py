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