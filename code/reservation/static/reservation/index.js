document.addEventListener('DOMContentLoaded', function () {
    var reservationList = JSON.parse(document.getElementById('jsonData').getAttribute('data-json'))
    // Convert reservation DB data to json object
    events = []
    reservationList.forEach(elem => {
        events.push({
            title: `${elem['department']} - ${elem['name']} (${elem['owner_id']})`,
            start: elem.start,
            end: elem.end
        })
    });
    console.log('events', events);
    // Initialize Modal
    var eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
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
            alert('Title: ' + eventObj.title);
        },
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
            startTime: '08:00',
            endTime: '22:00',
        },
        select: function (info) {
            document.getElementById('name').value = 'IDD - 王曉明(21011234)';
            document.getElementById('room').value = '第四研究室';
            document.getElementById('purpose').value = '';
            var startTime = new Date(info.startStr);
            var endTime = new Date(info.endStr);
            startDTP.updateOptions({
                viewDate: startTime,
            }, false);
            endDTP.updateOptions({
                viewDate: endTime,
            }, false);
            document.getElementById('start-time').value = startTime.toLocaleString();
            document.getElementById('end-time').value = endTime.toLocaleString();
            eventModal.show();
        },
    });
    // Define button click events
    var btnAdd = document.getElementById('btnAdd');
    btnAdd.addEventListener('click', function () {
        console.log(`start: ${toIsoString(startDTP.viewDate)}`);
        console.log(`end: ${toIsoString(endDTP.viewDate)}`);
        calendar.addEvent({
            title: document.getElementById('purpose').value,
            start: toIsoString(startDTP.viewDate),
            end: toIsoString(endDTP.viewDate),
        });
        eventModal.hide();
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