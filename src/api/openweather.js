import axios from "axios";

const API_KEY = process.env.REACT_APP_OWM_API_KEY; // CRA

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
});

export async function getCurrentByCity(city) {
  const { data } = await client.get("/weather", {
    params: { q: city, units: "metric", appid: API_KEY },
  });
  return data;
}

export async function getForecastByCity(city) {
  const { data } = await client.get("/forecast", {
    params: { q: city, units: "metric", appid: API_KEY },
  });
  return data;
}

export async function getCurrentByCoords(lat, lon) {
  const { data } = await client.get("/weather", {
    params: { lat, lon, units: "metric", appid: API_KEY },
  });
  return data;
}

export async function getForecastByCoords(lat, lon) {
  const { data } = await client.get("/forecast", {
    params: { lat, lon, units: "metric", appid: API_KEY },
  });
  return data;
}
