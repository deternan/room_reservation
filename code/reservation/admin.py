from django.contrib import admin

from .models import Admin, Organization, Room, Reservation

admin.site.register(Admin)
admin.site.register(Organization)
admin.site.register(Room)
admin.site.register(Reservation)
