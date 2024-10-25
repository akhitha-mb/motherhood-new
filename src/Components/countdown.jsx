import React, { useState, useEffect } from "react";

const Countdown = ({ deliveryDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const delivery = new Date(deliveryDate);
    const difference = delivery - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      <h2>Countdown to Delivery</h2>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

// Usage example:
// Pass the expected delivery date in "YYYY-MM-DD" format
export default function App() {
  return (
    <div className="App">
      <Countdown deliveryDate="2024-12-31" />
    </div>
  );
}
