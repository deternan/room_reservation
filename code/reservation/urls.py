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
]