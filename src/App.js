import { useState } from 'react';
import './App.css';
import { WeatherPage } from './components/WeatherPage/WeatherPage';

function App() {
  const [city, setCity] = useState('Calgary');
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);
    setCity(searchInput);
    console.log(city);
  };

  return (
    <div className="App">
      <div className="header">
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
      <WeatherPage location={city} />
    </div>
  );
}

export default App;
