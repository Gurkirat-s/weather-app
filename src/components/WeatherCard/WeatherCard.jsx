import React, { useEffect, useState } from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather, location, condition }) => {
  return (
    <div className="weather-card">
      <h2 className="location">
        {location.name}, {location.region}, {location.country}
      </h2>
      <div className="weather-today">
        <div className="condition">
          <img src={condition.icon} alt="Condition icon" />
          <p>{condition.text}</p>
        </div>
        <div className="weather">
          <p className="current-weather">
            {weather.temp_c}
            <span>&deg;C</span>
          </p>
          <p className="feels-like">Feels like {weather.feelslike_c} &deg;C</p>
        </div>
        <div className="extra-info">
          <p>Humidity: {weather.humidity} %</p>
          <p>Wind: {weather.wind_kph} km/h</p>
          <p>Pressure: {weather.pressure_mb} kPa</p>
        </div>
      </div>
    </div>
  );
};

const ForecastCard = ({ weather }) => {
  const time = new Date(weather.time);

  return (
    <div>
      <p>{weather.temp_c} &deg;C</p>
      <img src={weather?.condition?.icon}></img>
      <p>{time.toTimeString().split(' ')[0]}</p>
    </div>
  );
};

export default WeatherCard;
