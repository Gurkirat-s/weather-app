import React from 'react';
import './HourlyCard.css';
import moment from 'moment';

const HourlyGrid = ({ temp, icon, weatherTime }) => {
  // const time = new Date(weatherTime).toLocaleTimeString('en-US', {
  //   timeZone: 'EST',
  //   hour12: true,
  //   hour: 'numeric',
  //   minute: 'numeric',
  // });
  const time = moment(weatherTime).format('LT');
  // console.log(newTime.format('LT'));
  return (
    <div className="hourly-card">
      <p>{temp} &deg;C</p>
      <img src={icon}></img>
      <p>{time}</p>
    </div>
  );
};

export default HourlyGrid;
