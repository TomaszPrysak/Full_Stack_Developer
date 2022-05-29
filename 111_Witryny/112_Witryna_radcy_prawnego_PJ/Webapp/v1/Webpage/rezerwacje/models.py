from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.utils.html import escape, mark_safe
from django.utils.text import slugify
from django.urls import reverse

# Create your models here.

class User(AbstractUser):
    skype_login = models.CharField(max_length=100, unique=True, null=True, blank=True, error_messages={
            'unique': "Wprowadzony login Skype jest już istnieje w bazie danych",
        })
    phone_number = models.CharField(max_length=20, unique=True, null=True, blank=True, error_messages={
            'unique': "Wprowadzony numer telefonu już istnieje w bazie danych"
        }, verbose_name="Numer telefonu")
    is_manager = models.BooleanField('manager status', default=False)
    is_employee = models.BooleanField('employee status', default=False)
    is_client = models.BooleanField('client status', default=False)

    class Meta:
        verbose_name_plural = "Users"

class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

class VerifyCodeEmployeeRegistration(models.Model):
    autoid = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True, max_length = 254)
    code = models.CharField(unique=True, max_length=25, verbose_name="Kod weryfikujący rejestrację pracownika")
    date_creation = models.DateTimeField(default=timezone.now)
    is_used = models.BooleanField('verify code used', default=False)
    date_used = models.DateTimeField(null=True, blank=True)
