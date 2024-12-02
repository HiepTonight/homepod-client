import React from 'react'

const WeatherForecast = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Weather Forecast</h2>
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg">Sunny</span>
        <span className="text-lg">25°C</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm">Humidity:</span>
        <span className="text-sm">60%</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm">Wind:</span>
        <span className="text-sm">10 km/h</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm">Pressure:</span>
        <span className="text-sm">1013 hPa</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm">Visibility:</span>
        <span className="text-sm">10 km</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">UV Index:</span>
        <span className="text-sm">5</span>
      </div>
    </div>
  )
}

export default WeatherForecast