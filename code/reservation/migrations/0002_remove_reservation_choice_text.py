# Generated by Django 4.0 on 2022-01-15 12:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reservation',
            name='choice_text',
        ),
    ]
