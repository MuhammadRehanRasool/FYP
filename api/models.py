from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime
# Create your models here.


class CustomUser(AbstractUser):
    USER_TYPES = (
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('admin', 'Admin'),
    )
    userType = models.CharField(
        max_length=10, choices=USER_TYPES, blank=True, null=True)
    firstName = models.CharField(max_length=255, blank=True, null=True)
    lastName = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(
        max_length=10, default='male', blank=True, null=True)
    dateOfBirth = models.DateField(blank=True, default=datetime.date.today)
    phoneNumber = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    country = models.CharField(
        max_length=255, default='Pakistan', blank=True, null=True)
    state = models.CharField(
        max_length=255, default='Sindh', blank=True, null=True)
    street = models.TextField(blank=True, null=True)
    existingConditions = models.TextField(blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)
    currentMedications = models.TextField(blank=True, null=True)
    days = models.TextField(blank=True, null=True)
    hours = models.TextField(blank=True, null=True)
    speciality = models.TextField(blank=True, null=True)
    affiliation = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Users"

    def __str__(self):
        return f'{self.firstName} {self.lastName}'


class Conversation(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE, blank=True, null=True
    )
    sessionId = models.CharField(max_length=256)
    payload = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Conversations"

    def __str__(self):
        return f'{self.sessionId}'
