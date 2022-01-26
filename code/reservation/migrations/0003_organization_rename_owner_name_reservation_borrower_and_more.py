# Generated by Django 4.0 on 2022-01-26 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0002_remove_reservation_choice_text'),
    ]

    operations = [
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('department_code', models.CharField(max_length=20)),
                ('department_name', models.CharField(max_length=60)),
                ('create_time', models.DateTimeField(verbose_name='create time')),
                ('last_update_time', models.DateTimeField(verbose_name='last update time')),
            ],
        ),
        migrations.RenameField(
            model_name='reservation',
            old_name='owner_name',
            new_name='borrower',
        ),
        migrations.RenameField(
            model_name='reservation',
            old_name='owner_department',
            new_name='borrower_department_code',
        ),
        migrations.RenameField(
            model_name='reservation',
            old_name='owner_id',
            new_name='borrower_id',
        ),
        migrations.AddField(
            model_name='reservation',
            name='meeting_name',
            field=models.CharField(default='GG', max_length=60),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='room',
            name='manager',
            field=models.CharField(default='王曉明', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='room',
            name='manager_id',
            field=models.CharField(default='21011234', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='room',
            name='room_department',
            field=models.CharField(default='IDD', max_length=60),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='room',
            name='room_department_code',
            field=models.CharField(default='IDD', max_length=20),
            preserve_default=False,
        ),
    ]
