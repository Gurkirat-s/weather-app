import React, { useEffect, useState } from 'react';
import './WeatherCard.css';
import { getForecast } from '../../services/weather';

const WeatherCard = ({ location }) => {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [loc, setLoc] = useState({});
  const [condition, setCondition] = useState({});

  useEffect(() => {
    const fetchData = async (location) => {
      const forecastData = await getForecast(location);

      console.log(forecastData);

      setWeather(forecastData.current);
      setCondition(forecastData.current.condition);
      setLoc(forecastData.location);

      setForecast(get24HoursForecast(forecastData.forecast.forecastday));
    };
    fetchData(location);
  }, []);

  const get24HoursForecast = (forecast3Days) => {
    const result = [];
    const currentTime = new Date().getTime();

    for (let i = 0; i < forecast3Days.length; i++) {
      for (let j = 0; j < forecast3Days[i].hour.length; j++) {
        if (forecast3Days[i].hour[j].time_epoch > currentTime / 1000) {
          result.push(forecast3Days[i].hour[j]);
        }
        if (result.length >= 24) return result;
      }
    }

    console.log(result);
    return result;
  };

  return (
    <div className="weather-card">
      <h2 className="location">
        {loc.name}, {loc.region}, {loc.country}
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
