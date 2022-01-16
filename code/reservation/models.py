from django.db import models
from datetime import datetime

class Admin(models.Model):
    user_id = models.CharField(max_length=20)
    user_name = models.CharField(max_length=20)
    create_time = models.DateTimeField('create time')
    last_update_time = models.DateTimeField('last update time')

    def __str__(self):
        return f'{self.user_name} ({self.user_id})'

class Room(models.Model):
    room_name = models.CharField(max_length=30)
    create_time = models.DateTimeField('create time')
    last_update_time = models.DateTimeField('last update time')

    def __str__(self):
        return self.room_name

class Reservation(models.Model):
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    owner_id = models.CharField(max_length=20)
    owner_name = models.CharField(max_length=20)
    owner_department = models.CharField(max_length=20)
    begin_time = models.DateTimeField('begin time')
    end_time = models.DateTimeField('end time')
    create_time = models.DateTimeField('create time')
    last_update_time = models.DateTimeField('last update time')

    def date_to_string(self, date):
        return date.strftime('%Y-%m-%d (%a.) %H:%M:%S')

    def __str__(self):
        return f'{self.owner_department} - {self.owner_name} ({self.owner_id}) 預約 {self.room_id} 從 {self.date_to_string(self.begin_time)} 到 {self.date_to_string(self.end_time)}'