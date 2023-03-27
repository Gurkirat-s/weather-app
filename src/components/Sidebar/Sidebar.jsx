import React, { useEffect, useState } from 'react';
import { getCurrentWeather, getForecast } from '../../services/weather';
import './Sidebar.css';
import { AiOutlineClose } from 'react-icons/ai';

const Sidebar = ({
  hideSidebar,
  followedCities,
  removeCity,
  changeLocation,
}) => {
  return (
    <aside className={hideSidebar ? 'sidebar hidden' : 'sidebar'}>
      <h2>Followed Cities</h2>
      {followedCities.map((city, index) => {
        return (
          <Card
            key={index}
            location={city}
            removeCity={removeCity}
            changeLocation={changeLocation}
          />
        );
      })}
    </aside>
  );
};

const Card = ({ location, removeCity, changeLocation }) => {
  const [weather, setWeather] = useState({
    temp_c: 0,
    feelslike_c: 0,
  });
  const [locationInfo, setLocationInfo] = useState({
    name: '',
    region: '',
    country: '',
  });
  const [condition, setCondition] = useState({
    icon: '',
    text: '',
  });

  useEffect(() => {
    const fetchData = async (location) => {
      const weatherData = await getCurrentWeather(location);
      const forecastData = await getForecast(location);

      setWeather(weatherData.current);
      setCondition(weatherData.current.condition);
      setLocationInfo(weatherData.location);
    };
    fetchData(location);
  }, [location]);

  const handleRemoveCity = (e) => {
    e.stopPropagation();
    removeCity(location);
    console.log(location);
  };

  const handleLocationChange = () => {
    changeLocation(location);
  };

  return (
    <div className="sidebar-card" onClick={handleLocationChange}>
      <div className="close-icon" onClick={handleRemoveCity}>
        <AiOutlineClose />
      </div>
      <h4 className="location-name">{locationInfo.name}</h4>
      <div className="card-info">
        <div className="left">
          <img src={condition.icon} alt="Condition icon" />
          <p>{condition.text}</p>
        </div>
        <div className="right">
          {weather.temp_c}
          <span>&deg;C</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
