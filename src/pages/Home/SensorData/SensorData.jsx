import { useEffect, useRef, useState } from "react"
import { FaTemperatureHalf } from "react-icons/fa6"
import { MdWaterDrop } from "react-icons/md"
import { CiLight } from "react-icons/ci"
import { TbAirConditioning } from "react-icons/tb"
import getLatestSensorData from "../../../apis/SensorData/getLatestSensorData.js"
import { connect, disconnect } from "../../../apis/Mqtt.js"

const SensorData = ({ homePodId }) => {

  const [temp, setTemp] = useState(null);
  const [humi, setHumi] = useState(null);
  const [light, setLight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (data) => {
      console.log('Received message:', data);
      setTemp(data.temp);
      setHumi(data.humi);
      setLight(data.light);
      setLoading(false);
    };

    // Handle connection errors
    const handleError = (error) => {
      console.error('MQTT error:', error);
    };

    connect(homePodId, handleMessage, handleError);

    return () => {
      disconnect(homePodId);
    };
  }, [homePodId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLatestSensorData(homePodId);
        console.log('Sensor data:', homePodId);
        setTemp(data.data.temp);
        setHumi(data.data.humi);
        setLight(data.data.light);
        setLoading(false);
      } catch (err) {
        console.log(err.message || 'Có lỗi xảy ra khi gọi API');
      }
    };

    fetchData();
  }, [homePodId]);

  if (loading) {
    return (
      <div className='p-5 shadow bg-gradient-to-r from-[#1a1c1e] to-[#090d11] rounded-xl'>
        <h1 className='text-2xl font-bold text-white mb-4 '>Sensor Data</h1>
        <div className='p-2 grid grid-cols-2 gap-8 animate-pulse'>
          <div className='space-y-3 text-gray-300'>
            <div className='h-8 bg-gray-700 rounded w-24'></div>
            <div className='flex items-center space-x-2'>
              <FaTemperatureHalf className="text-yellow-500" /> <div className='h-4 bg-gray-700 rounded w-16'></div>
            </div>
          </div>
          <div className='space-y-3 text-gray-300'>
            <div className='h-8 bg-gray-700 rounded w-24'></div>
            <div className='flex items-center space-x-2'>
              <MdWaterDrop className="text-blue-500" /> <div className='h-4 bg-gray-700 rounded w-16'></div>
            </div>
          </div>
          <div className='space-y-3 text-gray-300'>
            <div className='h-8 bg-gray-700 rounded w-24'></div>
            <div className='flex items-center space-x-2'>
              <CiLight className="text-yellow-300" /> <div className='h-4 bg-gray-700 rounded w-16'></div>
            </div>
          </div>
          <div className='space-y-3 text-gray-300'>
            <div className='h-8 bg-gray-700 rounded w-24'></div>
            <div className='flex items-center space-x-2'>
              <TbAirConditioning className="text-green-500" /> <div className='h-4 bg-gray-700 rounded w-16'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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