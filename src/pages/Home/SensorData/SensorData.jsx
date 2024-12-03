import { useEffect, useState } from "react"
import { FaTemperatureHalf } from "react-icons/fa6"
import { MdWaterDrop } from "react-icons/md"
import { CiLight } from "react-icons/ci"
import { TbAirConditioning } from "react-icons/tb"
import { getLatestSensorData } from "../../../apis/SensorData/getLatestSensorData.js"
import { io } from "socket.io-client" // Add this import

const SensorData = () => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const socket = io('http://192.168.0.105:18085'); // Replace with your server URL

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("sensorData", (data) => {
      setSensorData(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLatestSensorData();
        setSensorData(data);
      } catch (err) {
        console.log(err.message || 'Có lỗi xảy ra khi gọi API');
      }
    };

    fetchData();
  }, []);

  const { temp, humi, light } = sensorData?.data || {};

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