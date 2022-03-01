var user_id = document.getElementById('user_id').getAttribute('data-json')
var user_name = document.getElementById('user_name').getAttribute('data-json')
var user_dept = document.getElementById('user_dept').getAttribute('data-json')

document.addEventListener('DOMContentLoaded', function () {
    var roomName = document.getElementById('roomData').getAttribute('data-json');
    var reservationList = JSON.parse(document.getElementById('jsonData').getAttribute('data-json'));

    console.log(`${user_dept} - ${user_name}(${user_id})`);
    // Convert reservation DB data to json object
    events = [];
    reservationList.forEach(elem => {
        events.push({
            id: elem['id'],
            title: elem['meeting_name'],
            start: elem['begin_time'],
            end: elem['end_time'],
            borrower_id: elem['borrower_id'],
            borrower: elem['borrower'],
            borrower_department_code: elem['borrower_department'],
        })
    });
    console.log('events', events);
    // Initialize Modal
    var eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    var editModal = new bootstrap.Modal(document.getElementById('editModal'));
    // Initialize datetimepicker
    var startDTP = new tempusDominus.TempusDominus(document.getElementById('startDatetimepicker'), {
        display: {
            icons: {
                time: 'bi bi-clock',
                date: 'bi bi-calendar',
                up: 'bi bi-arrow-up',
                down: 'bi bi-arrow-down',
                previous: 'bi bi-chevron-left',
                next: 'bi bi-chevron-right',
                today: 'bi bi-calendar-check',
                clear: 'bi bi-trash',
                close: 'bi bi-x',
            },
            buttons: {
                today: true,
                clear: true,
                close: true,
            },
        }
    });
    var endDTP = new tempusDominus.TempusDominus(document.getElementById('endDatetimepicker'), {
        display: {
            icons: {
                time: 'bi bi-clock',
                date: 'bi bi-calendar',
                up: 'bi bi-arrow-up',
                down: 'bi bi-arrow-down',
                previous: 'bi bi-chevron-left',
                next: 'bi bi-chevron-right',
                today: 'bi bi-calendar-check',
                clear: 'bi bi-trash',
                close: 'bi bi-x',
            },
            buttons: {
                today: true,
                clear: true,
                close: true,
            },
        }
    });
    var editStartDTP = new tempusDominus.TempusDominus(document.getElementById('edit-startDatetimepicker'), {
        display: {
            icons: {
                time: 'bi bi-clock',
                date: 'bi bi-calendar',
                up: 'bi bi-arrow-up',
                down: 'bi bi-arrow-down',
                previous: 'bi bi-chevron-left',
                next: 'bi bi-chevron-right',
                today: 'bi bi-calendar-check',
                clear: 'bi bi-trash',
                close: 'bi bi-x',
            },
            buttons: {
                today: true,
                clear: true,
                close: true,
            },
        }
    });
    var editEndDTP = new tempusDominus.TempusDominus(document.getElementById('edit-endDatetimepicker'), {
        display: {
            icons: {
                time: 'bi bi-clock',
                date: 'bi bi-calendar',
                up: 'bi bi-arrow-up',
                down: 'bi bi-arrow-down',
                previous: 'bi bi-chevron-left',
                next: 'bi bi-chevron-right',
                today: 'bi bi-calendar-check',
                clear: 'bi bi-trash',
                close: 'bi bi-x',
            },
            buttons: {
                today: true,
                clear: true,
                close: true,
            },
        }
    });
    // Initialize FullCalendar
    var calendarElem = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarElem, {
        initialView: 'dayGridMonth',
        selectable: true,
        selectMirror: true,
        // Check if event is overlap
        selectOverlap: function (event) {
            return event.rendering === 'background';
        },
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',

        },
        buttonText: {
            today: '今天',
            month: '月',
            week: '周',
            day: '日',
            list: '清單'
        },
        locale: 'zh-tw',
        firstDay: 1,
        events: events,
        eventClick: function (info) {
            var event = info.event;
            var name = `${event.extendedProps.borrower_department_code} - ${event.extendedProps.borrower}(${event.extendedProps.borrower_id})`;
            console.log(event.extendedProps.borrower_department_code)
            document.getElementById('eventId').value = event.id;
            document.getElementById('edit-name').value = name;
            document.getElementById('edit-room').value = roomName;
            document.getElementById('edit-purpose').value = event.title;
            var startTime = new Date(event.startStr);
            var endTime = new Date(event.endStr);
            editStartDTP.updateOptions({
                viewDate: startTime,
                display: {
                    icons: {
                        time: 'bi bi-clock',
                        date: 'bi bi-calendar',
                        up: 'bi bi-arrow-up',
                        down: 'bi bi-arrow-down',
                        previous: 'bi bi-chevron-left',
                        next: 'bi bi-chevron-right',
                        today: 'bi bi-calendar-check',
                        clear: 'bi bi-trash',
                        close: 'bi bi-x',
                    },
                    buttons: {
                        today: true,
                        clear: true,
                        close: true,
                    },
                }
            }, true);
            editEndDTP.updateOptions({
                viewDate: endTime,
                display: {
                    icons: {
                        time: 'bi bi-clock',
                        date: 'bi bi-calendar',
                        up: 'bi bi-arrow-up',
                        down: 'bi bi-arrow-down',
                        previous: 'bi bi-chevron-left',
                        next: 'bi bi-chevron-right',
                        today: 'bi bi-calendar-check',
                        clear: 'bi bi-trash',
                        close: 'bi bi-x',
                    },
                    buttons: {
                        today: true,
                        clear: true,
                        close: true,
                    },
                }
            }, true);
            document.getElementById('edit-start-time').value = startTime.toLocaleString();
            document.getElementById('edit-end-time').value = endTime.toLocaleString();
            editModal.show();
        },
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
            startTime: '08:00',
            endTime: '22:00',
        },
        select: function (info) {
            document.getElementById('name').value = `${user_dept} - ${user_name}(${user_id})`;
            document.getElementById('room').value = roomName;
            document.getElementById('purpose').value = '';
            var startTime = new Date(info.startStr);
            var endTime = new Date(info.endStr);
            startDTP.updateOptions({
                viewDate: startTime,
                display: {
                    icons: {
                        time: 'bi bi-clock',
                        date: 'bi bi-calendar',
                        up: 'bi bi-arrow-up',
                        down: 'bi bi-arrow-down',
                        previous: 'bi bi-chevron-left',
                        next: 'bi bi-chevron-right',
                        today: 'bi bi-calendar-check',
                        clear: 'bi bi-trash',
                        close: 'bi bi-x',
                    },
                    buttons: {
                        today: true,
                        clear: true,
                        close: true,
                    },
                }
            }, true);
            endDTP.updateOptions({
                viewDate: endTime,
                display: {
                    icons: {
                        time: 'bi bi-clock',
                        date: 'bi bi-calendar',
                        up: 'bi bi-arrow-up',
                        down: 'bi bi-arrow-down',
                        previous: 'bi bi-chevron-left',
                        next: 'bi bi-chevron-right',
                        today: 'bi bi-calendar-check',
                        clear: 'bi bi-trash',
                        close: 'bi bi-x',
                    },
                    buttons: {
                        today: true,
                        clear: true,
                        close: true,
                    },
                }
            }, true);
            document.getElementById('start-time').value = startTime.toLocaleString();
            document.getElementById('end-time').value = endTime.toLocaleString();
            eventModal.show();
        },
    });
    // Define button click events
    // Add event
    var btnAdd = document.getElementById('btnAdd');
    btnAdd.addEventListener('click', function () {
        var eventObj = {
            meeting_name: document.getElementById('purpose').value,
            begin_time: toIsoString(startDTP.viewDate),
            end_time: toIsoString(endDTP.viewDate),
            borrower_id: user_id,
            borrower: user_name,
            borrower_department_code: user_dept,
        };
        // ajax
        AddCalendarEvent(calendar, eventObj);
        eventModal.hide();
    });
    // Update event
    var btnUpdate = document.getElementById('btnUpdate');
    btnUpdate.addEventListener('click', function () {
        var eventId = document.getElementById('eventId').value;
        var event = calendar.getEventById(eventId);
        var eventObj = {
            id: parseInt(eventId),
            meeting_name: document.getElementById('edit-purpose').value,
            begin_time: toIsoString(editStartDTP.viewDate),
            end_time: toIsoString(editEndDTP.viewDate),
            borrower_id: event.extendedProps.borrower_id,
            borrower: event.extendedProps.borrower,
            borrower_department_code: event.extendedProps.borrower_department_code,
        };
        console.log('GG', eventObj);
        UpdateCalendarEvent(calendar, eventObj);
        editModal.hide();
    });
    // Delete event
    var btnDelete = document.getElementById('btnDelete');
    btnDelete.addEventListener('click', function () {
        var eventId = document.getElementById('eventId').value;

        var eventObj = {
            id: parseInt(eventId),
        };
        DeleteCalendarEvent(calendar, eventObj);

        editModal.hide();
    });
    calendar.render();
});

function AddCalendarEvent(calendar, eventObj) {
    var APIUrl = document.getElementById('btnAdd').getAttribute('data-url');
    var csrfToken = document.getElementById('btnAdd').getAttribute('data-token');
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result['response']) {
                var reservation_event = {
                    id: result['reservation_id'],
                    title: eventObj.meeting_name,
                    start: eventObj.begin_time,
                    end: eventObj.end_time,
                    borrower_id: eventObj.borrower_id,
                    borrower: eventObj.borrower,
                    borrower_department_code: eventObj.borrower_department_code,
                }
                calendar.addEvent(reservation_event);
            } else {
                alert('新增失敗 [錯誤的格式]')
            }

        }
    };

    xhr.open("POST", APIUrl, true);
    xhr.setRequestHeader("X-CSRFTOKEN", csrfToken);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(eventObj));
}

function UpdateCalendarEvent(calendar, eventObj) {
    var APIUrl = document.getElementById('btnUpdate').getAttribute('data-url');
    var csrfToken = document.getElementById('btnUpdate').getAttribute('data-token');
    var xhr = new XMLHttpRequest();
    console.log(eventObj);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result['response']) {
                var event = calendar.getEventById(eventObj.id);
                event.setProp('title', eventObj.meeting_name);
                event.setDates(eventObj.begin_time, eventObj.end_time);
            } else {
                alert('更新失敗 [錯誤的格式]')
            }
        }
    };

    xhr.open("POST", APIUrl, true);
    xhr.setRequestHeader("X-CSRFTOKEN", csrfToken);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(eventObj));
}

function DeleteCalendarEvent(calendar, eventObj) {
    var APIUrl = document.getElementById('btnDelete').getAttribute('data-url');
    var csrfToken = document.getElementById('btnDelete').getAttribute('data-token');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            if (result['response']) {
                var event = calendar.getEventById(eventObj.id);
                event.remove();
            } else {
                alert('刪除失敗 [錯誤的格式]')
            }
        }
    };

    xhr.open("POST", APIUrl, true);
    xhr.setRequestHeader("X-CSRFTOKEN", csrfToken);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(eventObj));
}

function toIsoString(date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function (num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };

    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}