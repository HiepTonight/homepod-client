// import { useLocation, useParams } from 'react-router-dom';
// import DataStatics from './DataStatics/DataStatics.jsx'
// import MyRoom from './MyRoom/MyRoom.jsx'
// import SensorData from './SensorData/SensorData.jsx'
// import Devices from './Device/Devices.jsx'
// import WeatherForecast from './WeatherForecast/WeatherForecast.jsx'
// import { useEffect, useState } from 'react';
// import getUserHome from '../../apis/Homes/GetUserHome';

// const Home = () => {
//   const { homeId } = useParams();

//   console.log('homeId', homeId);

//   // const location = useLocation();
//   // const { home } = location.state || {};

//   // console.log('home', home);

//   const [homeData, setHomeData] = useState(null);

//   useEffect(() => {
//     const fetchHomeData = async () => {
//       try {
//         const data = await getUserHome(homeId);
//         setHomeData(data);
//       } catch (error) {
//         console.error('Error fetching home data:', error);
//       }
//     };

//     fetchHomeData();
//   }, [homeId]);

//   if (!homeData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='p-5'>
//       <div className='grid grid-cols-2 gap-4 pb-5'>
//         <div className='grid grid-cols-2 gap-4'>
//           <SensorData homeId={homeId} />
//           <WeatherForecast homeId={homeId} />
//         </div>
//         <DataStatics homeId={homeId} className="" />
//         <Devices homeId={homeId} />
//       </div>
//       <MyRoom homeId={homeId} />
//     </div>
//   )
// }

// export default Home;


import { useSearchParams } from 'react-router-dom';
import DataStatics from './DataStatics/DataStatics.jsx';
import MyRoom from './MyRoom/MyRoom.jsx';
import SensorData from './SensorData/SensorData.jsx';
import Devices from './Device/Devices.jsx';
import WeatherForecast from './WeatherForecast/WeatherForecast.jsx';
import { useEffect, useState } from 'react';
import getUserHome from '../../apis/Homes/GetUserHome';

const Home = () => {
  const [searchParams] = useSearchParams();
  const homeId = searchParams.get('id');

  console.log('homeId', homeId);

  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await getUserHome(homeId);
        setHomeData(data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchHomeData();
  }, [homeId]);

  if (!homeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-5'>
      <div className='grid grid-cols-2 gap-4 pb-5'>
        <div className='grid grid-cols-2 gap-4'>
          <SensorData homeId={homeId} />
          <WeatherForecast homeId={homeId} />
        </div>
        <DataStatics homeId={homeId} className="" />
        <Devices homeId={homeId} />
      </div>
      <MyRoom homeId={homeId} />
    </div>
  );
};

export default Home;