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

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
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
    });
    calendar.render();
});