import DataStatics from './DataStatics/DataStatics.jsx'
import MyRoom from './MyRoom/MyRoom.jsx'
import SensorData from './SensorData/SensorData.jsx'
import Devices from './Device/Devices.jsx'

const Home = () => {
  

  return (
    <div className='p-5'>
      <div className='grid grid-cols-2 gap-4 pb-5'>
        <div className='grid grid-cols-2 gap-4'>
          <SensorData />
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