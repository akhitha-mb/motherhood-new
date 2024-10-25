// CalendarComponent.jsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';

const CalendarComponent = ({ expectedDeliveryDate }) => {
    const events = [
        {
            title: 'Expected Delivery',
            date: expectedDeliveryDate,
            color: 'orange', // Customize the color if needed
        },
    ];

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto' }}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
            />
        </div>
    );
};

export default CalendarComponent;