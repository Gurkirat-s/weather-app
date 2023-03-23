import { useEffect, useState } from 'react';
import './App.css';
import { WeatherPage } from './components/WeatherPage/WeatherPage';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [location, setLocation] = useState('Calgary');
  const [searchInput, setSearchInput] = useState('');
  const [hideSidebar, setHideSidebar] = useState(true);

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

  return (
    <div className="App">
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
      <WeatherPage location={location} />
    </div>
  );
}

export default App;
