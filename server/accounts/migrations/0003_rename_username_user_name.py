# Generated by Django 5.1.2 on 2024-10-09 09:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_rename_name_user_username'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='username',
            new_name='name',
        ),
    ]