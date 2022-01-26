# room_reservation

## Start web application
```
// Build DB
$ python manage.py migrate
// Open http://127.0.0.1:8000/reservation
$ python manage.py runserver
```

## Update DB schema
```
$ python manage.py makemigrations reservation
$ python manage.py migrate
```

## Pre Requirement
`$ pip install -r requirements.txt`

## Page
* Login - reservation/
* Index - reservation/index

## Web Packages
* Bootstrap 5
* FullCalendar

## Build backend admin user
`$ python manage.py createsuperuser`
