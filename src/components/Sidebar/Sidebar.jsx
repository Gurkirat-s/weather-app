import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ hideSidebar }) => {
  const [followedCities, setFollowedCities] = useState([]);

  const addCity = (city) => {
    setFollowedCities((prev) => [...prev, city]);
  };

  const removeCity = (city) => {
    setFollowedCities((prev) => {
      prev.filter((item) => item !== city);
    });
  };

  return (
    <aside className={hideSidebar ? 'sidebar hidden' : 'sidebar'}>
      <div>Test</div>
      {followedCities.map((city) => {
        return <div>{city}</div>;
      })}
    </aside>
  );
};

export default Sidebar;
