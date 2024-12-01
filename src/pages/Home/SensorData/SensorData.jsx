import { useEffect, useState } from "react";
import { FaTemperatureHalf } from "react-icons/fa6";
import { MdWaterDrop } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { TbAirConditioning } from "react-icons/tb";
import { getLatestSensorData } from "../../../apis/getLatestSensorData.js"; // Adjust the import path as needed

const SensorData = () => {
  const [sensorData, setSensorData] = useState(null);

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
    <div className='p-5 shadow bg-[#1a1c1e] rounded-xl'>
      <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Data</h1>
      <div className='p-2 grid grid-cols-2 gap-8'>
        <div className='space-y-3 text-gray-500 dark:text-gray-400'>
          <h1 className='text-2xl font-bold'>{temp} ℃</h1>
          <p className='flex items-center space-x2'>
            <FaTemperatureHalf/> <span>Temperature</span>
          </p>
        </div>
        
        <div className='space-y-3 text-gray-500 dark:text-gray-400'>
          <h1 className='text-2xl font-bold'>{humi} %</h1>
          <p className='flex items-center space-x2'>
            <MdWaterDrop/> <span>Humidity</span>
          </p>
        </div>
        
        <div className='space-y-3 text-gray-500 dark:text-gray-400'>
          <h1 className='text-2xl font-bold'>{light} %</h1>
          <p className='flex items-center space-x2'>
            <CiLight/> <span>Light</span>
          </p>
        </div>
        
        <div className='space-y-3 text-gray-500 dark:text-gray-400'>
          <h1 className='text-2xl font-bold'>50</h1>
          <p className='flex items-center space-x2'>
            <TbAirConditioning/> <span>Air</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SensorData