import { dailyFrom3Hourly, formatDate, iconUrl } from "../utils/format";

export default function DailyForecast({ forecast }) {
  if (!forecast) return null;

  const { list, city } = forecast;
  const tz = city.timezone;
  const days = dailyFrom3Hourly(list, tz);

  return (
    <section className="daily">
      <h3>5-Day Forecast</h3>
      <div className="days">
        {days.map((d) => (
          <div className="day-card" key={d.dateKey}>
            <div className="day">{formatDate(d.dt, tz, "ddd")}</div>
            <img src={iconUrl(d.icon)} alt={d.description} />
            <div className="range">
              <strong>{d.max}°</strong>
              <span>{d.min}°</span>
            </div>
            <div className="dsc">{d.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
