import React, { useEffect, useState } from 'react';
import './WeatherCard.css';
import { getCurrentWeather, getForecast } from '../../services/weather';

const WeatherCard = ({ location }) => {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const forecastData = await getForecast(location);
        setWeather(forecastData.current);
        setForecast(forecastData.forecast);
        console.log(forecastData);
      } catch (error) {
        console.log(error);
      }
      // getForecast(location).then((response) => {
      //   setWeather(response.current);
      //   setForecast(response.forecast);
      //   console.log(response.forecast);
      // });
    };

    fetchForecastData();
    // console.log(forecast.forecastday[0].hour);
  }, []);

  return (
    <div className="weather-card">
      WeatherCard for {location}
      <p>{weather.feelslike_c} C</p>
      <ul>
        {forecast.forecastday &&
          forecast.forecastday[0].hour.map((hour, index) => (
            <li key={index}>
              {hour.time.split(' ')[1]} : {hour.temp_c} {hour.condition.text}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WeatherCard;
