import React, { useEffect, useState } from 'react';
import './WeatherCard.css';
import { getCurrentWeather, getForecast } from '../../services/weather';

const WeatherCard = ({ location }) => {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [loc, setLoc] = useState({});
  const [condition, setCondition] = useState({});

  useEffect(() => {
    const fetchData = async (location) => {
      const weatherData = await getCurrentWeather(location);
      const forecastData = await getForecast(location);
      setWeather(weatherData.current);
      setCondition(weatherData.current.condition);
      setLoc(weatherData.location);

      setForecast(
        // getOnlyFutureForecast(forecastData.forecast.forecastday[0].hour)
        get24HoursForecast(forecastData.forecast.forecastday)
      );
      // console.log(forecastData.forecast.forecastday);
    };
    fetchData(location);
  }, []);

  const get24HoursForecast = (forecast3Days) => {
    const result = [];
    const currentTime = new Date().getTime();

    console.log(forecast3Days);
    console.log('hello');

    while (result.length < 24) {
      for (let i = 0; i < forecast3Days.length; i++) {
        for (let j = 0; j < forecast3Days[i].hour.length; j++) {
          console.log(
            forecast3Days[i].hour[j].time_epoch + ' vs ' + currentTime / 1000
          );
          if (forecast3Days[i].hour[j].time_epoch > currentTime / 1000) {
            result.push(forecast3Days[i].hour[j]);
          }
        }
      }
    }
    console.log(result);
    return result;
  };

  const getOnlyFutureForecast = (allForecast) => {
    const currentTime = new Date().getTime();
    const result = allForecast.filter((item) => {
      let newTime = new Date(item.time_epoch);
      newTime = newTime.getTime();
      // console.log(newTime + ' vs ' + currentTime / 1000);
      return item.time_epoch > currentTime / 1000;
    });
    // console.log(result);
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
          <p className="current-weather">{weather.temp_c} &deg;C</p>
          <p className="feels-like">Feels like {weather.feelslike_c} &deg;C</p>
        </div>
        <div className="extra-info">
          <p>Humidity: {weather.humidity} %</p>
          <p>Wind: {weather.wind_kph} km/h</p>
          <p>Pressure: {weather.pressure_mb} kPa</p>
        </div>
      </div>
      <ul className="weather-today-hourly">
        {forecast.map((item) => (
          <ForecastCard key={item.time_epoch} weather={item} />
        ))}
      </ul>
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
