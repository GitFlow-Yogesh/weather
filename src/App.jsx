import { useEffect, useState } from "react";
import "./index.css";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import Loading from "./components/Loading";
import ErrorBanner from "./components/ErrorBanner";
import Footer from "./components/Footer";

import {
  getCurrentByCity,
  getForecastByCity,
  getCurrentByCoords,
  getForecastByCoords,
} from "./api/openweather";

export default function App() {
  console.log("API key:", process.env.REACT_APP_OWM_API_KEY);
  
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const DEFAULT_CITY = "Bengaluru";

  async function loadByCity(city) {
    try {
      setErr("");
      setLoading(true);
      const [c, f] = await Promise.all([
        getCurrentByCity(city),
        getForecastByCity(city),
      ]);
      setCurrent(c);
      setForecast(f);
    } catch (e) {
      console.error(e);
      setErr("City not found or API error.");
      setCurrent(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }

  async function loadByGeo() {
    if (!navigator.geolocation) {
      setErr("Geolocation not supported. Showing Bengaluru weather.");
      await loadByCity(DEFAULT_CITY);
      return;
    }

    setErr("");
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const [c, f] = await Promise.all([
            getCurrentByCoords(latitude, longitude),
            getForecastByCoords(latitude, longitude),
          ]);
          setCurrent(c);
          setForecast(f);
        } catch (e) {
          console.error(e);
          setErr("Unable to fetch weather for your location. Showing Bengaluru.");
          await loadByCity(DEFAULT_CITY);
        } finally {
          setLoading(false);
        }
      },
      async (geoErr) => {
        // console.error(geoErr);
        setErr("Permission denied. Showing Bengaluru weather.");
        await loadByCity(DEFAULT_CITY);
        setLoading(false);
      }
    );
  }

  // Run on first load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadByGeo();
  }, []);

  return (
    <div className="app">
      <div className="main-content">
      <Header onSearch={loadByCity} onUseLocation={loadByGeo} />
      <ErrorBanner message={err} />
      {loading && <Loading />}

      {current && (
        <>
          <CurrentWeather data={current} />
          <HourlyForecast forecast={forecast} />
          <DailyForecast forecast={forecast} />
        </>
      )}

      {!loading && !current && !err && (
        <div className="empty">Search a city or use your location to begin.</div>
      )}</div>
      <Footer />
    </div>
  );
}
