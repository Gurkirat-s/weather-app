import { useEffect, useState } from 'react';
import './App.css';
import { WeatherPage } from './components/WeatherPage/WeatherPage';

function App() {
  const [location, setLocation] = useState('Calgary');
  const [searchInput, setSearchInput] = useState('');

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

  return (
    <div className="App">
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
