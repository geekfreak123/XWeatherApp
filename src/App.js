import React, { useState } from "react";
import "./styles.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "b67e9d05c60f499393934221232712";

  const handleSearch = () => {
    if (city.trim() === "") {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {weatherData && (
        <div className="weather-card">
          <h2>
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
