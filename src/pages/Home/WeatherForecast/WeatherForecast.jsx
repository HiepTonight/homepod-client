import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const api_key = 'c06cbbb8c672c156e7cc7b854914e29a';
  const city = 'Hanoi';
  const current = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(current);
        setWeatherData(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex flex-col bg-gradient-to-r from-[#192131] to-[#0d2214] rounded p-4 w-full animate-pulse">
          <div className="font-bold text-xl text-white bg-gray-700 rounded w-24 h-6 mb-2"></div>
          <div className="text-sm text-gray-400 bg-gray-700 rounded w-32 h-4 mb-4"></div>
          <div className="text-6xl self-center inline-flex items-center justify-center rounded-lg text-zinc-100 h-24 w-24 bg-gray-700"></div>
          <div className="flex flex-row items-center gap-5 xl:gap-8 justify-center mt-4">
            <div className="font-medium text-4xl 2xl:text-5xl text-white bg-gray-700 rounded w-16 h-8"></div>
            <div className="flex flex-col items-center ml-6">
              <div className='text-white bg-gray-700 rounded w-24 h-4 mb-2'></div>
              <div className="bg-gray-700 rounded w-16 h-4 mb-1"></div>
              <div className="bg-gray-700 rounded w-16 h-4"></div>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-4">
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm text-white bg-gray-700 rounded w-12 h-4 mb-1"></div>
              <div className="text-sm text-gray-400 bg-gray-700 rounded w-16 h-4"></div>
            </div>
            <div className="flex flex-col items-center text-white">
              <div className="font-medium text-sm bg-gray-700 rounded w-12 h-4 mb-1"></div>
              <div className="text-sm text-gray-400 bg-gray-700 rounded w-16 h-4"></div>
            </div>
            <div className="flex flex-col items-center text-white">
              <div className="font-medium text-sm bg-gray-700 rounded w-12 h-4 mb-1"></div>
              <div className="text-sm text-gray-400 bg-gray-700 rounded w-16 h-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col bg-gradient-to-r from-[#192131] to-[#0d2214] rounded p-4 w-full">
        <div className="font-bold text-xl text-white">{weatherData.name}</div>
        <div className="text-sm text-gray-400">{new Date().toLocaleDateString()}</div>
        <div className="text-6xl self-center inline-flex items-center justify-center rounded-lg text-zinc-100 h-24 w-24">
          <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
          </svg>
        </div>
        <div className="flex flex-row items-center gap-5 xl:gap-8 justify-center mt-4">
          <div className="font-medium text-4xl 2xl:text-5xl text-white">{weatherData.main.temp}°C</div>
          <div className="flex flex-col items-center ml-6">
            <div className='text-white'>{weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}</div>
            <div className="">
              <span className="text-sm"><i className="far fa-long-arrow-up"></i></span>
              <span className="text-sm font-light text-gray-400">{weatherData.main.temp_max}°C</span>
            </div>
            <div>
              <span className="text-sm"><i className="far fa-long-arrow-down"></i></span>
              <span className="text-sm font-light text-gray-400">{weatherData.main.temp_min}°C</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-4">
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm text-white">Wind</div>
            <div className="text-sm text-gray-400">{weatherData.wind.speed} km/h</div>
          </div>
          <div className="flex flex-col items-center text-white">
            <div className="font-medium text-sm">Humidity</div>
            <div className="text-sm text-gray-400">{weatherData.main.humidity}%</div>
          </div>
          <div className="flex flex-col items-center text-white">
            <div className="font-medium text-sm">Visibility</div>
            <div className="text-sm text-gray-400">{weatherData.visibility / 1000} km</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;