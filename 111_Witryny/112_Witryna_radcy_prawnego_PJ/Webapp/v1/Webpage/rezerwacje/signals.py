from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.db.models import F
from . import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

@receiver(post_save, sender=models.User)
def post_save_create_edit_user(sender, instance, created, **kwargs):
    # print(sender)
    # print(instance)
    # print(created)
    if created:
        if instance.is_manager:
            models.Manager.objects.create(user=instance)
        elif instance.is_employee:
            models.Employee.objects.create(user=instance)
        elif instance.is_client:
            models.Client.objects.create(user=instance)

    if not created:
        if instance.is_manager:
            if len(models.Manager.objects.filter(user=instance)) == 0:
                models.Manager.objects.create(user=instance)
            if len(models.Employee.objects.filter(user=instance)) != 0:
                models.Employee.objects.filter(user=instance).delete()
            if len(models.Client.objects.filter(user=instance)) != 0:
                models.Client.objects.filter(user=instance).delete()
        elif instance.is_employee:
            if len(models.Employee.objects.filter(user=instance)) == 0:
                models.Employee.objects.create(user=instance)
            if len(models.Manager.objects.filter(user=instance)) != 0:
                models.Manager.objects.filter(user=instance).delete()
            if len(models.Client.objects.filter(user=instance)) != 0:
                models.Client.objects.filter(user=instance).delete()
        elif instance.is_client:
            if len(models.Client.objects.filter(user=instance)) == 0:
                models.Client.objects.create(user=instance)
            if len(models.Manager.objects.filter(user=instance)) != 0:
                models.Manager.objects.filter(user=instance).delete()
            if len(models.Employee.objects.filter(user=instance)) != 0:
                models.Employee.objects.filter(user=instance).delete()
