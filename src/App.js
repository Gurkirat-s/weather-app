import { useEffect, useState } from 'react';
import './App.css';
import { WeatherPage } from './components/WeatherPage/WeatherPage';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import useFollowedCities, {
  followedCities,
  addCity,
  removeCity,
} from './hooks/useFollowedCities';

function App() {
  const [location, setLocation] = useState('Calgary');
  const [searchInput, setSearchInput] = useState('');
  const [hideSidebar, setHideSidebar] = useState(true);
  const { followedCities, addCity, removeCity } = useFollowedCities();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation(pos.coords.latitude + ',' + pos.coords.longitude);
      });
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);
    setLocation(searchInput);
  };

  const toggleSidebar = () => {
    setHideSidebar((prev) => !prev);
  };

  const handleAddCity = () => {
    addCity(location);
    console.log(followedCities);
  };

  const handleRemoveCity = (city) => {
    removeCity(city);
  };

  return (
    <div className="app">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar hideSidebar={hideSidebar} className="test" />
      <div className="search">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            name="search"
            placeholder="City"
          />
          <button htmlFor="search">Search</button>
        </form>
      </div>
      <button onClick={handleAddCity}>Add Current City</button>
      <WeatherPage location={location} />
    </div>
  );
}

export default App;
