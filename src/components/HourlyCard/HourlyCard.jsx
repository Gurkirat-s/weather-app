import React from 'react';
import './HourlyCard.css';

const HourlyGrid = ({ temp, icon, weatherTime }) => {
  const time = new Date(weatherTime).toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  });
  return (
    <div className="hourly-card">
      <p>{temp} &deg;C</p>
      <img src={icon}></img>
      <p>{time}</p>
    </div>
  );
};

export default HourlyGrid;
