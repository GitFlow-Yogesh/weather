import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * OpenWeather returns timestamps in UTC (seconds) and a city timezone offset (seconds).
 * This converts a unix time + offset to local time string like "6:45 AM"
 */
export function formatTime(unixSeconds, tzOffsetSeconds, pattern = "h:mm A") {
  const utcMs = (unixSeconds + tzOffsetSeconds) * 1000;
  return dayjs(utcMs).utc().format(pattern);
}

export function formatDate(unixSeconds, tzOffsetSeconds, pattern = "ddd, MMM D") {
  const utcMs = (unixSeconds + tzOffsetSeconds) * 1000;
  return dayjs(utcMs).utc().format(pattern);
}

/**
 * From 3-hourly forecast list -> next N hours
 */
export function takeNextHours(list, n = 12) {
  return list.slice(0, n);
}

/**
 * Group 3-hourly forecast into calendar days and pick a representative item (e.g., midday),
 * and compute min/max temps for the day.
 */
export function dailyFrom3Hourly(list, tzOffsetSeconds) {
  const byDay = {};
  list.forEach(item => {
    const localDate = formatDate(item.dt, tzOffsetSeconds, "YYYY-MM-DD");
    if (!byDay[localDate]) byDay[localDate] = [];
    byDay[localDate].push(item);
  });

  const days = Object.keys(byDay)
    .sort()
    .map(dateKey => {
      const items = byDay[dateKey];
      const temps = items.map(i => i.main.temp);
      const min = Math.round(Math.min(...temps));
      const max = Math.round(Math.max(...temps));
      // pick around midday if available, else the middle item
      const midday =
        items.find(i => {
          const hour = dayjs(i.dt * 1000).utc().hour();
          return hour === 12;
        }) || items[Math.floor(items.length / 2)];

      return {
        dateKey,
        min,
        max,
        icon: midday.weather?.[0]?.icon,
        description: midday.weather?.[0]?.description,
        dt: midday.dt
      };
    });

  // Return next 5 days (including possibly today)
  return days.slice(0, 5);
}

/** OWM icon URL helper */
export function iconUrl(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

export function kmFromMeters(m) {
  return (m / 1000).toFixed(1);
}
