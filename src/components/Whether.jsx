import React, { useEffect, useRef, useState } from 'react'
import './Whether.css'
import { FaSearch } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';

const Whether = () => {
const inputRef = useRef()
  const [weatherData,setWeatherData]= useState(false);

  const allIcons ={
    "01d" : "/assets/cloud.png",
    "01n" : "/assets/rain-image.png",
    "02d" : "/assets/rain.png",
    "02n" : "/assets/rainy.png",
    "03d" : "/assets/search.png",
    
  }

  const search = async (city)=>{
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response =await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon =allIcons[data.weather[0].icon] ;
      setWeatherData({
        humidity:data.main.humidity,
        windspeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location: data.name,
        icon:icon
      })
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    search("London")
  },[])
  return (
        <div className='weather'>
            <div className='search-bar'>
              
                <input ref = {inputRef} type="text" placeholder='Search'/>
                <img src="/assets/search.png" alt=""  onClick={()=>search (inputRef.current.value)}/>
            </div>
            <img src={weatherData.icon} alt="" className='weather-icon'/>
            <p className='temperature'>{weatherData.temperature}</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
              <div className="col">
                <img src="/assets/rain.png" alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humadity</span>
              </div>
            </div>

            <div className="col">
              <div>
              <img src="/assets/rainy.png" alt="" />
                <p>{weatherData.windspeed}°C</p>
                <span>Wind Speed</span>
              </div>
            </div>
            </div>
        </div>
  )
}

export default Whether