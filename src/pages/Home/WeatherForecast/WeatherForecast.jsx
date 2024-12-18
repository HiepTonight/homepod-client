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
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    if (!weatherData) {
        return (
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-lg shadow-lg animate-pulse">
                <h2 className="text-2xl font-bold mb-4">Weather Forecast</h2>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-lg bg-gray-700 rounded w-24 h-6"></span>
                    <span className="text-lg bg-gray-700 rounded w-12 h-6"></span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm bg-gray-700 rounded w-16 h-4"></span>
                    <span className="text-sm bg-gray-700 rounded w-8 h-4"></span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm bg-gray-700 rounded w-16 h-4"></span>
                    <span className="text-sm bg-gray-700 rounded w-8 h-4"></span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm bg-gray-700 rounded w-16 h-4"></span>
                    <span className="text-sm bg-gray-700 rounded w-8 h-4"></span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm bg-gray-700 rounded w-16 h-4"></span>
                    <span className="text-sm bg-gray-700 rounded w-8 h-4"></span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm bg-gray-700 rounded w-16 h-4"></span>
                    <span className="text-sm bg-gray-700 rounded w-8 h-4"></span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Weather Forecast</h2>
            <div className="flex justify-between items-center mb-2">
                <span className="text-lg">{weatherData.weather[0].description}</span>
                <span className="text-lg">{weatherData.main.temp}°C</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Humidity:</span>
                <span className="text-sm">{weatherData.main.humidity}%</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Wind:</span>
                <span className="text-sm">{weatherData.wind.speed} km/h</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Pressure:</span>
                <span className="text-sm">{weatherData.main.pressure} hPa</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Visibility:</span>
                <span className="text-sm">{weatherData.visibility / 1000} km</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm">Cloudiness:</span>
                <span className="text-sm">{weatherData.clouds.all}%</span>
            </div>
        </div>
    );
};

export default WeatherForecast;