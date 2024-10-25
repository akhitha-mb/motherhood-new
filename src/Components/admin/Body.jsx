import React, { useState, useEffect } from 'react';
import './Body.css';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Body() {
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(null);
  const [name, setName] = useState('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/user/view', {
          headers: {
            Authorization: token // Correctly format the Authorization header
          }
        });

        // Set the response data
        const deliveryDate = new Date(response.data.expectedDelivery);
        const today = new Date();

        // Calculate days until delivery
        const timeDifference = deliveryDate - today;
        const millisecondsInADay = 1000 * 60 * 60 * 24;
        const daysUntilTarget = Math.ceil(timeDifference / millisecondsInADay); // Use Math.ceil to round up

        if (daysUntilTarget < 0) {
          console.log("The target date is in the past.");
          setExpectedDeliveryDate(null); // Set to null if the date is in the past
        } else {
          console.log(`There are ${daysUntilTarget} days until ${deliveryDate.toISOString().slice(0, 10)}.`);
          setExpectedDeliveryDate(deliveryDate); // Set the actual delivery date
        }

        setName(response.data.name || 'No name available');
      } catch (error) {
        console.error('Error fetching data:', error);
        setExpectedDeliveryDate(null);
        setName('Error fetching name');
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  return (
    <div>
      <h1 className='text-center px-4 py-4'>Welcome to Motherhood</h1>
      <div className="dash-container col-2 mx-auto px-5 py-4">
        <p>Delivery in: {expectedDeliveryDate ? Math.ceil((expectedDeliveryDate - new Date()) / (1000 * 60 * 60 * 24)) : 'No delivery date available'} days</p>
        <p>Name: {name}</p>
      </div>
      <div className='mx-auto col-4'>
        <h1>Delivery Date Calendar</h1>
        <Calendar
          value={expectedDeliveryDate} // Set the actual delivery date
          // tileContent={tileContent} // Uncomment this line if you want to customize the tile
        />
      </div>
    </div>
  );
}