# Generated by Django 3.2.3 on 2021-11-30 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rezerwacje', '0002_onetimeverifycodeforemployeeregistration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='onetimeverifycodeforemployeeregistration',
            name='code',
            field=models.TextField(max_length=30, verbose_name='Kod weryfikujący rejestrację pracownika'),
        ),
    ]
