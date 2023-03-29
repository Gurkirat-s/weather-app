import React, { useContext, useEffect, useState } from 'react';
import { getForecast } from '../../services/weather';
import './WeatherPage.css';

import WeatherCard from '../WeatherCard/WeatherCard';
import HourlyCard from '../HourlyCard/HourlyCard';
import DayCard from '../DayCard/DayCard';
import { ThreeDots } from 'react-loader-spinner';
import { ThemeContext } from '../../context/ThemeContext';

export const WeatherPage = ({ location }) => {
  const [weather, setWeather] = useState({
    temp_C: 0,
    feelslike_c: 0,
    humidity: 0,
    wind_kph: 0,
    pressure_mb: 0,
  });
  const [forecast, setForecast] = useState([]);
  const [forecast3Days, setForecast3Days] = useState([]);
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
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async (location) => {
      setLoading(true);
      console.log(location);
      console.log('hello');
      const forecastData = await getForecast(location);

      setWeather(forecastData.current);
      setCondition(forecastData.current.condition);
      setLocationInfo(forecastData.location);

      setForecast(get24HoursForecast(forecastData.forecast.forecastday));
      setForecast3Days(forecastData.forecast.forecastday);

      setLoading(false);
    };
    if (location !== '' || location != null) {
      console.log(location);
      fetchData(location);
    }
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
        <div
          className={
            theme === 'dark' ? 'weather-page dark-theme' : 'weather-page'
          }
        >
          <WeatherCard
            weather={weather}
            condition={condition}
            location={locationInfo}
          />
          <div className="hourly-container">
            <h2>24 Hour Forecast</h2>
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
          <div className="daily-container">
            {forecast3Days.map((item, index) => {
              return (
                <DayCard
                  key={index}
                  temp={item.day.avgtemp_c}
                  min={item.day.mintemp_c}
                  max={item.day.maxtemp_c}
                  icon={item.day.condition.icon}
                  condition={item.day.condition.text}
                  date={item.date_epoch}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
