import '../styles/ForecastCard.scss';

export default function ForecastCard({ forecast }) {
  return (
    <div className="forecast">
      {forecast.forecastday.map(day => (
        <div className="forecast-day" key={day.date}>
          <p>{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}</p>
          <img src={day.day.condition.icon} alt={day.day.condition.text} />
          <p>{Math.round(day.day.avgtemp_c)}°C</p>
        </div>
      ))}
    </div>
  );
}