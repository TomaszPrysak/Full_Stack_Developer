# Generated by Django 3.2.3 on 2021-12-07 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rezerwacje', '0007_verifycodeemployeeregistration_is_used'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='skype_login',
            field=models.CharField(blank=True, error_messages={'unique': 'Login skype który wpisujesz już jest zajęty'}, max_length=100, null=True, unique=True),
        ),
    ]