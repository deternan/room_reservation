from django.contrib import admin

from .models import Admin, Room, Reservation

admin.site.register(Admin)
admin.site.register(Room)
admin.site.register(Reservation)
