# Generated by Django 5.1.2 on 2024-10-17 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='category',
            field=models.CharField(choices=[('bills', 'Bills'), ('transportation', 'Transportation'), ('clothes', 'Clothes'), ('education', 'Education'), ('allowance', 'Allowance'), ('awards', 'Awards'), ('bonus', 'Bonus'), ('investment', 'Investment')], max_length=20),
        ),
    ]
