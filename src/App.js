import { useEffect, useState } from 'react';
import './App.css';
import { WeatherPage } from './components/WeatherPage/WeatherPage';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import useFollowedCities from './hooks/useFollowedCities';
import { Toaster } from 'react-hot-toast';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const [location, setLocation] = useState('Calgary');
  const [searchInput, setSearchInput] = useState('');
  const [hideSidebar, setHideSidebar] = useState(true);
  const { followedCities, addCity, removeCity } = useFollowedCities();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log('app useEffect');
        setLocation(pos.coords.latitude + ',' + pos.coords.longitude);
      });
    }
  }, []);

  const changeLocation = (location) => {
    setLocation(location);
    setHideSidebar(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // console.log(searchInput);
    if (searchInput !== '') {
      setLocation(searchInput);
    }
  };

  const toggleSidebar = () => {
    setHideSidebar((prev) => !prev);
  };

  const handleAddCity = () => {
    addCity(location);
    console.log(location);
    // console.log(followedCities);
  };

  const handleRemoveCity = (city) => {
    removeCity(city);
  };

  const changeTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') {
        return 'dark';
      } else {
        return 'light';
      }
    });
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={theme === 'dark' ? 'app dark-theme' : 'app'}>
        <Toaster positon="top-center" />
        <Header
          changeTheme={changeTheme}
          hideSidebar={hideSidebar}
          toggleSidebar={toggleSidebar}
        />
        <Sidebar
          removeCity={handleRemoveCity}
          followedCities={followedCities}
          hideSidebar={hideSidebar}
          changeLocation={changeLocation}
          className="test"
        />
        <div className="search">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              name="search"
              placeholder="City"
            />
            <div className="buttons">
              <button htmlFor="search">Search</button>
              <button className="follow-city-btn" onClick={handleAddCity}>
                Follow City
              </button>
            </div>
          </form>
        </div>
        <WeatherPage location={location} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
