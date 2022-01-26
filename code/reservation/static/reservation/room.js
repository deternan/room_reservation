document.addEventListener('DOMContentLoaded', function () {
    var countId = 0;
    var roomName = document.getElementById('roomData').getAttribute('data-json');
    var reservationList = JSON.parse(document.getElementById('jsonData').getAttribute('data-json'))
    // Convert reservation DB data to json object
    events = []
    reservationList.forEach(elem => {
        events.push({
            id: elem['id'],
            title: elem['meeting_name'],
            start: elem.start,
            end: elem.end
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
            var eventObj = info.event;
            document.getElementById('eventId').value = eventObj.id;
            document.getElementById('edit-name').value = 'IDD - 王曉明(21011234)';
            document.getElementById('edit-room').value = roomName;
            document.getElementById('edit-purpose').value = eventObj.title;
            var startTime = new Date(eventObj.startStr);
            var endTime = new Date(eventObj.endStr);
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
            document.getElementById('name').value = 'IDD - 王曉明(21011234)';
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
        console.log(`start: ${toIsoString(startDTP.viewDate)}`);
        console.log(`end: ${toIsoString(endDTP.viewDate)}`);
        calendar.addEvent({
            id: countId.toString(),
            title: document.getElementById('purpose').value,
            start: toIsoString(startDTP.viewDate),
            end: toIsoString(endDTP.viewDate),
        });
        countId++;
        eventModal.hide();
    });
    // Update event
    var btnUpdate = document.getElementById('btnUpdate');
    btnUpdate.addEventListener('click', function () {
        var eventId = document.getElementById('eventId').value;
        var eventObj = calendar.getEventById(eventId);
        eventObj.setProp('title', document.getElementById('purpose').value);
        eventObj.setDates(toIsoString(editStartDTP.viewDate), toIsoString(editEndDTP.viewDate));
        editModal.hide();
    });
    // Delete event
    var btnDelete = document.getElementById('btnDelete');
    btnDelete.addEventListener('click', function () {
        var eventId = document.getElementById('eventId').value;
        var eventObj = calendar.getEventById(eventId);
        eventObj.remove();
        editModal.hide();
    });
    calendar.render();
});

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