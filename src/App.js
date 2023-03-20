import './App.css';
import WeatherCard from './components/WeatherCard/WeatherCard';

function App() {
  return (
    <div className="App">
      <WeatherCard location="Toronto" />
    </div>
  );
}

export default App;
