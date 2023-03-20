const getCurrentWeather = async (location = 'Toronto') => {
  const url = `${process.env.REACT_APP_API_URL}current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const getForecast = async (location = 'Toronto') => {
  const url = `${process.env.REACT_APP_API_URL}forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&days=3`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export { getCurrentWeather, getForecast };
