import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useFollowedCities() {
  const [followedCities, setFollowedCities] = useState([]);

  const addCity = (city) => {
    if (followedCities.find((item) => item === city)) {
      toast.error('City has already been added.');
    } else {
      toast.success('City added.');
      setFollowedCities([...followedCities, city]);
    }
  };

  const removeCity = (city) => {
    console.log(followedCities);
    const newFollowedCities = followedCities.filter((item) => item !== city);
    toast.success('City removed.');
    console.log(newFollowedCities);
    setFollowedCities(newFollowedCities);
  };

  return { followedCities, addCity, removeCity };
}
