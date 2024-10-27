import React, { useState, useEffect } from 'react';
import './Body.css';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Body() {
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(null);
  const [daysUntilDelivery, setDaysUntilDelivery] = useState(null);
  const [name, setName] = useState('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/user/view', {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.expectedDelivery) {
          const deliveryDate = new Date(response.data.expectedDelivery);
          console.log("Fetched delivery date:", deliveryDate);

          setExpectedDeliveryDate(deliveryDate);
          setName(response.data.name || 'No name available');

          // Calculate days until delivery
          const today = new Date();
          const timeDifference = deliveryDate - today;
          const millisecondsInADay = 1000 * 60 * 60 * 24;
          const daysUntilTarget = Math.ceil(timeDifference / millisecondsInADay);

          if (daysUntilTarget < 0) {
            console.log("The target date is in the past.");
            setDaysUntilDelivery(null); // Set to null if the date is in the past
          } else {
            console.log(`There are ${daysUntilTarget} days until ${deliveryDate.toISOString().slice(0, 10)}.`);
            setDaysUntilDelivery(daysUntilTarget); // Set the days until delivery
          }
        } else {
          console.log("No delivery date found in response.");
          setDaysUntilDelivery(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setExpectedDeliveryDate(null);
        setDaysUntilDelivery(null);
        setName('Error fetching name');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className='text-center px-4 py-4'>Welcome to Motherhood</h1>
      <div className="dash-container col-2 mx-auto px-5 py-4">
        <p>Delivery in: {daysUntilDelivery !== null ? `${daysUntilDelivery} days` : 'No delivery date available'}</p>
        <p>Name: {name}</p>
      </div>
      <div className='mx-auto col-4'>
        <h1>Delivery Date Calendar</h1>
        <Calendar
          value={expectedDeliveryDate}
        />
      </div>
    </div>
  );
}
