from django.shortcuts import render
from django.http import HttpResponse

from .models import Reservation, Room

import json

def login(request):
    return render(request, 'reservation/login.html')

def index(request):
    room_list = list(Room.objects.order_by('id'))
    context = {'room_list': room_list}
    return render(request, 'reservation/index.html', context)

def room(request, room_id):
    try:
        reservation_list = Reservation.objects.filter(room_id=room_id)
    except Reservation.DoesNotExist:
        reservation_list = []
    print(reservation_list)
    room_info = Room.objects.get(pk=room_id)
    context = dict()
    data = [
        {
            'id': elem.id,
            'borrower_id': elem.borrower_id,
            'borrower': elem.borrower,
            'borrower_department': elem.borrower_department_code,
            'meeting_name': elem.meeting_name,
            'start': elem.begin_time.isoformat(),
            'end': elem.end_time.isoformat(),
        }
        for elem in reservation_list
    ]
    print(data)
    context['reservation'] = json.dumps(data)
    context['room'] = room_info

    return render(request, 'reservation/room.html', context)