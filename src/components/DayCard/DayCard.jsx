import React from 'react';
import './DayCard.css';
import moment from 'moment';

const DayCard = ({ date, temp, min, max, icon, condition }) => {
  //Convert to EST from GMT
  const day = moment((date + 14400) * 1000).format('dddd');

  return (
    <div className="day-card">
      <h3>{day}</h3>
      <div className="weather">
        <div className="condition">
          <img src={icon} alt="Condition icon" />
          <p>{condition}</p>
        </div>
        <div className="right-weather">
          <h4>
            {temp} <span>&deg;C</span>
          </h4>
          <div className="min-max">
            <p>Min: {min} &deg;C</p>
            <p>Max: {max} &deg;C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
