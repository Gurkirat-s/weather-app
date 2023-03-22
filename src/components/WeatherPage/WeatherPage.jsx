import React, { useEffect, useState } from 'react';
import { getForecast } from '../../services/weather';
import './WeatherPage.css';

import WeatherCard from '../WeatherCard/WeatherCard';
import HourlyCard from '../HourlyCard/HourlyCard';
import { ThreeDots } from 'react-loader-spinner';

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

      console.log(forecastData.current);

      setWeather(forecastData.current);
      setCondition(forecastData.current.condition);
      setLocationInfo(forecastData.location);

      setForecast(get24HoursForecast(forecastData.forecast.forecastday));

      setLoading(false);
    };
    fetchData(location);
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
        <div className="loader">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#0077b6"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
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
