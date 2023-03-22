import React, { useEffect, useState } from 'react';
import { getForecast } from '../../services/weather';
import './WeatherPage.css';

import WeatherCard from '../WeatherCard/WeatherCard';
import HourlyCard from '../HourlyCard/HourlyCard';

export const WeatherPage = ({ location }) => {
  const [weather, setWeather] = useState({
    temp_C: 0,
    feelslike_c: 0,
    humidity: 0,
    wind_kph: 0,
    pressure_mb: 0,
  });
  const [forecast, setForecast] = useState([]);
  const [locationInfo, setLocationInfo] = useState({
    name: '',
    region: '',
    country: '',
  });
  const [condition, setCondition] = useState({
    icon: '',
    text: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (location) => {
      setLoading(true);

      const forecastData = await getForecast(location);

      // console.log(forecastData);

      setWeather(forecastData.current);
      setCondition(forecastData.current.condition);
      setLocationInfo(forecastData.location);

      setForecast(get24HoursForecast(forecastData.forecast.forecastday));

      setLoading(false);
    };
    fetchData(location);
    // console.log(weather);
  }, [location]);

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

    // console.log(result);
    return result;
  };

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="weather-page">
          <WeatherCard
            weather={weather}
            condition={condition}
            location={locationInfo}
          />
          <div className="hourly-grid">
            {forecast.map((item, index) => {
              return (
                <HourlyCard
                  key={index}
                  temp={item.temp_c}
                  icon={item.condition.icon}
                  weatherTime={item.time}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
