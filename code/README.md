# room_reservation

## Start web application
```
// Build DB
$ python manage.py migrate 
$ python manage.py runserver
```
> Open the link http://127.0.0.1:8000/reservation

## Update DB schema
```
$ python manage.py makemigrations reservation
$ python manage.py migrate
```

## Pre Requirement
`$ pip install -r requirements.txt`

## Page Route
* Login page - **reservation/**
* Index page (Show room list) - **reservation/index**
* Room page (Show room reservations)- **reservation/room**
* Admin page (Backend database admin) - **admin/**

## Web Packages
* Bootstrap5
* Bootstrap-icon
* FullCalendar
* PopperJS
* Tempus Dominus (Date/time Picker)

## Build backend admin user
`$ python manage.py createsuperuser`
> Open the link http://127.0.0.1:8000/admin to enter admin page.
> <br/>If you forget your password, you can enter the command below to reset it.

```$ python manage.py changepassword <user_name>```
