import { formatTime, iconUrl } from "../utils/format";

export default function CurrentWeather({ data }) {
  if (!data) return null;

  const { name, weather, main, sys, wind, visibility, timezone } = data;
  const icon = weather?.[0]?.icon;
  const desc = weather?.[0]?.description;

  return (
    <section className="current">
      <div className="current-left">
        <h2 className="city">{name}</h2>
        <div className="temp-row">
          <img src={iconUrl(icon)} alt={desc} />
          <div>
            <div className="temp">{Math.round(main?.temp)}°C</div>
            <div className="desc">Feels like {Math.round(main?.feels_like)}° • {desc}</div>
          </div>
        </div>
      </div>

      <div className="current-right">
        <div className="kv">
          <span>Sunrise</span>
          <strong>{formatTime(sys?.sunrise, timezone)}</strong>
        </div>
        <div className="kv">
          <span>Sunset</span>
          <strong>{formatTime(sys?.sunset, timezone)}</strong>
        </div>
        <div className="kv">
          <span>Humidity</span>
          <strong>{main?.humidity}%</strong>
        </div>
        <div className="kv">
          <span>Wind</span>
          <strong>{Math.round(wind?.speed)} m/s</strong>
        </div>
        <div className="kv">
          <span>Pressure</span>
          <strong>{main?.pressure} hPa</strong>
        </div>
        <div className="kv">
          <span>Visibility</span>
          <strong>{(visibility/1000).toFixed(1)} km</strong>
        </div>
      </div>
    </section>
  );
}
