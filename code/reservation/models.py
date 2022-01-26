from django.db import models
from datetime import datetime

class Admin(models.Model):
    user_id = models.CharField(max_length=20)
    user_name = models.CharField(max_length=20)
    create_time = models.DateTimeField('create time')
    last_update_time = models.DateTimeField('last update time')

    def __str__(self):
        return f'{self.user_name} ({self.user_id})'

class Organization(models.Model):
    department_code = models.CharField(max_length=20)
    department_name = models.CharField(max_length=60)
    create_time = models.DateTimeField('create time')
    last_update_time = models.DateTimeField('last update time')

    def __str__(self):
        return f'{self.department_code} - {self.department_name}'

class Room(models.Model):
    room_name = models.CharField(max_length=30)
    room_department_code = models.CharField(max_length=20)
    room_department = models.CharField(max_length=60)
    manager_id = models.CharField(max_length=20)
    manager = models.CharField(max_length=20)
    create_time = models.DateTimeField('create time')
    last_update_time = models.DateTimeField('last update time')

    def __str__(self):
        return f'{self.room_department_code} - {self.room_name}'

class Reservation(models.Model):
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    meeting_name = models.CharField(max_length=60)
    borrower_id = models.CharField(max_length=20)
    borrower = models.CharField(max_length=20)
    borrower_department_code = models.CharField(max_length=20)
    begin_time = models.DateTimeField('begin time')
    end_time = models.DateTimeField('end time')
    create_time = models.DateTimeField('create time')
    last_update_time = models.DateTimeField('last update time')

    def date_to_string(self, date):
        return date.strftime('%Y-%m-%d (%a.) %H:%M:%S')

    def __str__(self):
        return f'{self.meeting_name}, {self.borrower_department_code} - {self.borrower} ({self.borrower_id}) 預約 {self.room_id} 從 {self.date_to_string(self.begin_time)} 到 {self.date_to_string(self.end_time)}'