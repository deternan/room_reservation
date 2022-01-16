from django.shortcuts import render
from django.http import HttpResponse

from .models import Reservation

import json

def login(request):
    return render(request, 'reservation/login.html')

def index(request):
    reservation_list = list(Reservation.objects.order_by('begin_time')[:])
    context = dict()
    data = [
        {
            'id': elem.id,
            'owner_id': elem.owner_id,
            'name': elem.owner_name,
            'department': elem.owner_department,
            'start': elem.begin_time.isoformat(),
            'end': elem.end_time.isoformat(),
        }
        for elem in reservation_list
    ]
    context['reservation'] = json.dumps(data)

    return render(request, 'reservation/index.html', context)