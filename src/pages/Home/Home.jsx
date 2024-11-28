import DataStatics from './DataStatics/DataStatics.jsx'
import MyRoom from './MyRoom/MyRoom.jsx'
import SensorData from './SensorData/SensorData.jsx'
import Devices from './Device/Devices.jsx'
import { useEffect, useState } from 'react'
import { getLatestSensorData } from '../../apis/getLatestSensorData'

const Home = () => {
  const [sensorData, setSensorData] = useState(null)

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
  }, [])

  return (
    <div className='p-5'>
      <div className='grid grid-cols-2 gap-4 pb-5'>
        <div className='grid grid-cols-2 gap-4'>
          <SensorData sensorData={sensorData} />
          <SensorData />
        </div>
        <DataStatics className="" />
        {/* Device */}
        <Devices/>
      </div>

      <MyRoom />

    </div>
  )
}

export default Home