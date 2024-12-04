import { useEffect, useRef, useState } from "react"
import { FaTemperatureHalf } from "react-icons/fa6"
import { MdWaterDrop } from "react-icons/md"
import { CiLight } from "react-icons/ci"
import { TbAirConditioning } from "react-icons/tb"
import { getLatestSensorData } from "../../../apis/SensorData/getLatestSensorData.js"
import { connect, disconnect } from "../../../apis/Mqtt.js"

const SensorData = () => {

  const [temp, setTemp] = useState(null);
  const [humi, setHumi] = useState(null);
  const [light, setLight] = useState(null);

  useEffect(() => {
    // const socket = new WebSocket('ws://localhost:8080/api/v1/websocket'); // Replace with your WebSocket server URL

    const handleMessage = (data) => {
      console.log('Received message:', data);
      setTemp(data.temp);
      setHumi(data.humi);
      setLight(data.light);
    };

    // Handle connection errors
    const handleError = (error) => {
      console.error('MQTT error:', error);
    };

    connect(handleMessage, handleError);

    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLatestSensorData();
        setTemp(data.data.temp);
        setHumi(data.data.humi);
        setLight(data.data.light);
        // console.log('Sensor data:', data.data);
      } catch (err) {
        console.log(err.message || 'Có lỗi xảy ra khi gọi API');
      }
    };

    fetchData();
  }, []);

  // const { temp, humi, light } = sensorData?.data || {};

  return (
    <div className='p-5 shadow bg-gradient-to-r from-[#1a1c1e] to-[#090d11] rounded-xl'>
      <h1 className='text-2xl font-bold text-white mb-4'>Sensor Data</h1>
      <div className='p-2 grid grid-cols-2 gap-8'>
        <div className='space-y-3 text-gray-300'>
          <h1 className='text-2xl font-bold'>{temp} ℃</h1>
          <p className='flex items-center space-x-2'>
            <FaTemperatureHalf className="text-yellow-500"/> <span>Temperature</span>
          </p>
        </div>
        
        <div className='space-y-3 text-gray-300'>
          <h1 className='text-2xl font-bold'>{humi} %</h1>
          <p className='flex items-center space-x-2'>
            <MdWaterDrop className="text-blue-500"/> <span>Humidity</span>
          </p>
        </div>
        
        <div className='space-y-3 text-gray-300'>
          <h1 className='text-2xl font-bold'>{light} %</h1>
          <p className='flex items-center space-x-2'>
            <CiLight className="text-yellow-300"/> <span>Light</span>
          </p>
        </div>
        
        <div className='space-y-3 text-gray-300'>
          <h1 className='text-2xl font-bold'>50</h1>
          <p className='flex items-center space-x-2'>
            <TbAirConditioning className="text-green-500"/> <span>Air Quality</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SensorData