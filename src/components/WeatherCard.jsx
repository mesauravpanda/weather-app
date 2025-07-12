import ForecastCard from './ForecastCard';
import '../styles/WeatherCard.scss';

export default function WeatherCard({ data }) {
  const { location, current, forecast } = data;

  return (
    <div className="card">
      <h2>{location.name}, {location.country}</h2>
      <img src={current.condition.icon} alt={current.condition.text} />
      <p className="temp">{current.temp_c}°C</p>
      <p>{current.condition.text}</p>

      <ForecastCard forecast={forecast} />
    </div>
  );
}
