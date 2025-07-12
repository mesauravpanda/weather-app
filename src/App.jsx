import { useState, useEffect } from 'react';
import './styles/WeatherApp.scss';
import WeatherCard from './components/WeatherCard.jsx';

const API_KEY = 'e4e5064d29a34e6bb5045258251207';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  // Fetch forecast weather for today + next 6 days
  const fetchWeather = async (query) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=7`
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setWeather(data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  // Auto-fetch based on user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const query = `${position.coords.latitude},${position.coords.longitude}`;
        fetchWeather(query);
      },
      () => {
        setError('Location permission denied. Please search manually.');
      }
    );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    fetchWeather(city.trim());
  };

  return (
    <div className="app">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">→</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}