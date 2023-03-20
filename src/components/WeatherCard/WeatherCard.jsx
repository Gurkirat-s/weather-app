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
      setForecast(forecastData.forecast.forecastday[0].hour);
      console.log(forecastData.forecast.forecastday[0].hour);

      // console.log(forecastData.forecast.forecastday);
    };
    fetchData(location);

    // fetchForecastData();
    // console.log(forecast.forecastday[0].hour);
  }, []);

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
  const time = new Date(weather.timey);

  return (
    <div>
      <p>{weather.temp_c} &deg;C</p>
      <img src={weather?.condition?.icon}></img>
      <p>{time.getHours()}</p>
    </div>
  );
};

export default WeatherCard;
