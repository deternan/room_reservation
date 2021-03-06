# Generated by Django 4.0 on 2022-01-15 12:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=20)),
                ('user_name', models.CharField(max_length=20)),
                ('create_time', models.DateTimeField(verbose_name='create time')),
                ('last_update_time', models.DateTimeField(verbose_name='last update time')),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_name', models.CharField(max_length=30)),
                ('create_time', models.DateTimeField(verbose_name='create time')),
                ('last_update_time', models.DateTimeField(verbose_name='last update time')),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choice_text', models.CharField(max_length=200)),
                ('owner_id', models.CharField(max_length=20)),
                ('owner_name', models.CharField(max_length=20)),
                ('owner_department', models.CharField(max_length=20)),
                ('begin_time', models.DateTimeField(verbose_name='begin time')),
                ('end_time', models.DateTimeField(verbose_name='end time')),
                ('create_time', models.DateTimeField(verbose_name='create time')),
                ('last_update_time', models.DateTimeField(verbose_name='last update time')),
                ('room_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reservation.room')),
            ],
        ),
    ]
