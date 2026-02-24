import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);

  // Accessing the API key from environment variables
  const api_key = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    // Get lat/lng for the capital city
    const [lat, lon] = country.capitalInfo.latlng;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`,
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Weather fetch failed", error);
      });
  }, [country, api_key]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />

      {weather ? (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <div>temperature {weather.main.temp} Celsius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default CountryDetail;
