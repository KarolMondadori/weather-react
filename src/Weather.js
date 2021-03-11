import React, {useState} from "react";
import axios from "axios";

export default function Weather(props) {
    const [city, setCity] = useState("");
    const [message, setMessage] = useState(false);
    const [weather, setWeather] = useState({});
  
    function displayWeather(response) {
      setMessage(true);
      setWeather({
        temperature: response.data.main.temp,
        wind: response.data.wind.speed,
        humidity: response.data.main.humidity,
        icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      });
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=994481b47d184794d0b8fe0506cdf444&units=metric`;
      axios.get(apiUrl).then(displayWeather);
    }
  
    function changeCity(event) {
      setCity(event.target.value);
    }
  
    let form = (
      <form onSubmit={handleSubmit}>
        <input className="enterCity" type="search" placeholder="City" onChange={changeCity} />
        <button className="search" type="Submit"> Search </button>
        <button className="current" type="Submit"> Current </button>
      </form>
    );
  
    if (message) {
      return (
        <div className="weather-app">
          {form}
          <ul>
            <li className="temperature">☁️ Temperature: {Math.round(weather.temperature)}ºC</li>
            <li className="humidity">💧 Humidity: {weather.humidity}%</li>
            <li className="wind">🌬 Wind: {weather.wind}km/h</li>
          </ul>
          <h3>{city}</h3>
          <img className="icon" src={weather.icon} alt="Weather Icon" />
        </div>
        
      );
    } else {
      return form;
    }
  }
  