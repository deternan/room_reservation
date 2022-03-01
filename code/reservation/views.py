from urllib import response
import requests
from datetime import datetime
from venv import create
from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse

from .models import Reservation, Room, Admin

import json


def login(request):
    """Login page
        (GET) - Display login page
        (POST) - User login from login form (API)
    """
    if request.method == 'POST':
        data = {
            'UserID': request.POST['userID'],
            'password': request.POST['password'],
            # 'remember': request.POST.get('remember') is not None
        }
        request.session['user_id'] = data['UserID']
        request.session['passwd'] = data['password']

        login_api = 'http://inlcnws/InxSSOAuth/api/Auth/CheckAD'
        response = requests.post(login_api, json=data)
        json_response = json.loads(response.text)
        print(json_response)

        if json_response['errMsg'] == '':
            user_properties = json.loads(json_response['Properties'])
            print(user_properties)
            request.session['user_id'] = user_properties['employeeid'][0]
            display_name = user_properties['displayname'][0]
            request.session['user_name'] = display_name.split(' ')[-1]
            request.session['user_dept'] = user_properties['department'][0]

            try:
                _ = Admin.objects.get(user_id=request.session['user_id'])
                request.session['is_admin'] = True
            except Admin.DoesNotExist:
                request.session['is_admin'] = False

            return HttpResponseRedirect(reverse('reservation:index'))
        else:
            msg = '登入失敗'
            return render(request, 'reservation/login.html', locals())
    else:
        if 'user_id' in request.session:
            return HttpResponseRedirect(reverse('reservation:index'))
        else:
            return render(request, 'reservation/login.html', locals())


def logout(request):
    """Logout (API)"""
    for key in request.session.keys():
        del request.session[key]

    return HttpResponseRedirect(reverse('reservation:login'))


def index(request):
    """Display room list"""
    room_list = list(Room.objects.order_by('id'))
    context = {'room_list': room_list}
    return render(request, 'reservation/index.html', context)


def room(request, room_id):
    """Display reservation data of room with room_id"""
    try:
        print(type(request.session['is_admin']), request.session['is_admin'])
        if request.session['is_admin']:
            reservation_list = Reservation.objects.filter(room_id=room_id)
        else:
            reservation_list = Reservation.objects.filter(
                room_id=room_id, borrower_id=request.session['user_id'])
    except Reservation.DoesNotExist:
        reservation_list = []

    print(reservation_list)
    room_info = Room.objects.get(pk=room_id)
    context = dict()
    data = [{
        'id': elem.id,
        'borrower_id': elem.borrower_id,
        'borrower': elem.borrower,
        'borrower_department': elem.borrower_department_code,
        'meeting_name': elem.meeting_name,
        'begin_time': elem.begin_time.isoformat(),
        'end_time': elem.end_time.isoformat(),
    } for elem in reservation_list]

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
