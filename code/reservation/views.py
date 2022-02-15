from datetime import datetime
from venv import create
from django.shortcuts import render
from django.http import JsonResponse

from .models import Reservation, Room

import json

def login(request):
    """Login page"""
    return render(request, 'reservation/login.html')

def index(request):
    """Display room list"""
    room_list = list(Room.objects.order_by('id'))
    context = {'room_list': room_list}
    return render(request, 'reservation/index.html', context)

def room(request, room_id):
    """Display reservation data of room with room_id"""
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
            'begin_time': elem.begin_time.isoformat(),
            'end_time': elem.end_time.isoformat(),
        }
        for elem in reservation_list
    ]

    context['reservation'] = json.dumps(data)
    context['room'] = room_info

    return render(request, 'reservation/room.html', context)

def add_event(request, room_id):
    """Add event data of room reservation (API)
    """
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax:
        if request.method == 'POST':
            room = Room.objects.get(pk=room_id)
            data = json.loads(request.body)
            new_reservation = Reservation.objects.create(
                room_id=room,
                meeting_name=data['meeting_name'],
                borrower_id=data['borrower_id'],
                borrower=data['borrower'],
                borrower_department_code=data['borrower_department_code'],
                begin_time=data['begin_time'],
                end_time=data['end_time'],
            )
            new_reservation.save()
            result = {
                'reservation_id': new_reservation.id,
                'response': True,
            }
            return JsonResponse(result)
        else:
            result = {
                'reservation_id': None,
                'response': False,
            }
            return JsonResponse(result)

def update_event(request):
    """Update event data of room reservation (API)
    """
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax:
        if request.method == 'POST':
            data = json.loads(request.body)
            reservation_id = data['id']
            reservation = Reservation.objects.get(pk=reservation_id)
            reservation.meeting_name = data['meeting_name']
            reservation.begin_time = data['begin_time']
            reservation.end_time = data['end_time']
            reservation.save()

            result = {
                'response': True,
            }
            return JsonResponse(result)
        else:
            result = {
                'response': False,
            }
            return JsonResponse(result)
    
def delete_event(request):
    """Delete event data of room reservation (API)
    """
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax:
        if request.method == 'POST':
            data = json.loads(request.body)
            reservation_id = data['id']
            reservation = Reservation.objects.get(pk=reservation_id)
            reservation.delete()
            
            result = {
                'response': True,
            }
            return JsonResponse(result)
        else:
            result = {
                'response': False,
            }
            return JsonResponse(result)
    