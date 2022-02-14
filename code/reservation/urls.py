from django.urls import path

from . import views

app_name = 'reservation'
urlpatterns = [
    # e.g. /reservation/login
    path('', views.login, name='login'),
    # e.g. /reservation/index
    path('index/', views.index, name='index'),
    # e.g. /reservation/room/1
    path('room/<int:room_id>/', views.room, name='room'),
    # e.g. /reservation/add_event/1
    path('add_event/<int:room_id>/', views.add_event, name='add_event'),
]