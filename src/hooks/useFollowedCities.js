import { useState } from 'react';

export default function useFollowedCities() {
  const [followedCities, setFollowedCities] = useState([]);

  const addCity = (city) => {
    setFollowedCities([...followedCities, city]);
  };

  const removeCity = (city) => {
    setFollowedCities(followedCities.filter((item) => item === city));
  };

  return { followedCities, addCity, removeCity };
}
