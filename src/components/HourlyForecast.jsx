import { formatTime, iconUrl, takeNextHours } from "../utils/format";

export default function HourlyForecast({ forecast }) {
  if (!forecast) return null;

  const { list, city } = forecast;
  const tz = city.timezone;

  const hours = takeNextHours(list, 12);

  return (
    <section className="hourly">
      <h3>Hourly Forecast</h3>
      <div className="scroller">
        {hours.map((h) => (
          <div className="hour-card" key={h.dt}>
            <div className="time">{formatTime(h.dt, tz, "h A")}</div>
            <img src={iconUrl(h.weather?.[0]?.icon)} alt={h.weather?.[0]?.description} />
            <div className="htemp">{Math.round(h.main.temp)}°C</div>
          </div>
        ))}
      </div>
    </section>
  );
}
