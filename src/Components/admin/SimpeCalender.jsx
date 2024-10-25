// SimpleCalendar.jsx
import React from 'react';

const SimpleCalender = ({ expectedDeliveryDate }) => {
    const expectedDate = new Date(expectedDeliveryDate);
    const month = expectedDate.getMonth(); // Month (0-11)
    const year = expectedDate.getFullYear(); // Year
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in month

    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const isExpectedDelivery = day === expectedDate.getDate() && month === expectedDate.getMonth() && year === expectedDate.getFullYear();
        days.push(
            <div key={day} className={`day ${isExpectedDelivery ? 'highlight' : ''}`}>
                {day}
            </div>
        );
    }

    return (
        <div className="calendar" style={styles.calendar}>
            {days}
        </div>
    );
};

const styles = {
    calendar: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '5px',
        maxWidth: '700px',
        margin: 'auto',
    },
    day: {
        border: '1px solid #ccc',
        padding: '10px',
        textAlign: 'center',
        position: 'relative',
    },
    highlight: {
        backgroundColor: 'orange',
        color: 'white',
    },
};

export default SimpleCalender;