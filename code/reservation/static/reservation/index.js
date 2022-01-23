document.addEventListener('DOMContentLoaded', function () {
    var reservationList = JSON.parse(document.getElementById('jsonData').getAttribute('data-json'))

    events = []
    reservationList.forEach(elem => {
        events.push({
            title: `${elem['department']} - ${elem['name']} (${elem['owner_id']})`,
            start: elem.start,
            end: elem.end
        })
    });
    var eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
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
            document.getElementById('start-time').value = info.startStr;
            document.getElementById('end-time').value = info.endStr;
            eventModal.show();
        },
    });

    var btnAdd = document.getElementById('btnAdd');
    btnAdd.addEventListener('click', function () {
        calendar.addEvent({
            title: '開會',
            start: document.getElementById('start-time').value,
            end: document.getElementById('end-time').value,
        });
        eventModal.hide();
    });

    calendar.render();
});