import React, { useState } from 'react';
import './WeatherApp.css';
import rain_icon from '../Assets/rain.png';
import Search from '../Assets/search.png';
import Wind_icon from '../Assets/wind.png';
import Humidity_icon from '../Assets/humidity.png';
import cloud_icon from '../Assets/cloud.png';
import clear_icon from '../Assets/clear.png';
import drizzle_icon from '../Assets/drizzle.png';
import snow_icon from '../Assets/snow.png';

const WeatherApp = () => {
  let api_key = "5aca00b1cee5d731df1d59cf9faacca4";

  const [wicon, setWicon] = useState(cloud_icon);
  const [temperature, setTemperature] = useState("24°C");
  const [location, setLocation] = useState("London");
  const [errorMessage, setErrorMessage] = useState("");

  const search = async () => {
    const element = document.querySelector(".cityInput");
    if (!element || element.value === "") {
      return 0;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);
      

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.cod === 200) {
      const humidityElement = document.querySelector(".humidity-percent");
      const windElement = document.querySelector(".wind-rate");

      humidityElement.innerHTML = data.main.humidity + " %";
      windElement.innerHTML = data.wind.speed + " km/h";

      setTemperature(data.main.temp + "°C");
      setLocation(data.name);

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloud_icon);
      } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setWicon(cloud_icon);
      } else if (data.weather[0].icon === "30d" || data.weather[0].icon === "30n") {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
      setErrorMessage("")
    }
    else{
      setErrorMessage("Please enter a valid place.");
    }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // You can display an error message to the user here.
      setErrorMessage ("An error occurred while fetching data.");
      // display an error message to the user here.
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className='cityInput' placeholder='Search District' />
        <div className='search-icon' onClick={() => { search() }}>
          <img src={Search} alt="" />
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className='weather-image'>
        <img src={wicon} alt="" />
      </div>
      <div className="wether-temp">{temperature}</div>
      <div className="wether-location">{location}</div>
      <div className="data-container">
        <div className="element">
          <img src={Humidity_icon} alt="" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={Wind_icon} alt="" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
