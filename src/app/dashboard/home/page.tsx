import React, { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import getHomeDetails from '../../../apis/Homes/GetUserHome';
import SensorData from '@/pages/Home/SensorData/SensorData';
import WeatherForecast from '@/pages/Home/WeatherForecast/WeatherForecast';
import DataStatics from '@/pages/Home/DataStatics/DataStatics';
import Devices from './device/page';
import MyRoom from '@/pages/Home/MyRoom/MyRoom';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const { onHomeNameChange } = useOutletContext();
  const homeId = searchParams.get('id');
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeDetails = async () => {
      try {
        const data = await getHomeDetails(homeId);
        setHomeData(data);
        setLoading(false);
        console.log(onHomeNameChange(data.name))
      } catch (error) {
        console.error('Error fetching home details:', error);
        setLoading(false);
      }
    };

    fetchHomeDetails();
  }, [homeId, onHomeNameChange]);

  if (loading) {
    return (
      <div className="p-5">
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-4 pb-5">
          <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
            <Skeleton className="h-72 mb-4" />
            <Skeleton className="h-72 mb-4" />
          </div>
          <Skeleton className="h-72 mb-4" />
          <Skeleton className="h-52 col-span-2 mb-4" />
        </div>
        <Skeleton className="h-96 mb-4" />
      </div>
    );
  }

  if (!homeData) {
    return <div>
      <div className="p-5">
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-4 pb-5">
          <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
            <Skeleton className="h-72 mb-4" />
            <Skeleton className="h-72 mb-4" />
          </div>
          <Skeleton className="h-72 mb-4" />
          <Skeleton className="h-52 col-span-2 mb-4" />
        </div>
        <Skeleton className="h-96 mb-4" />
      </div>
    </div>;
  }

  return (
    <div className='p-5'>
      <div className='flex flex-col xl:grid xl:grid-cols-2 gap-4 pb-5'>
        <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
          <SensorData homeId={homeId} homePodId={homeData.homePodId} />
          <WeatherForecast homeId={homeId} homePodId={homeData.homePodId} />
        </div>
        <DataStatics homeId={homeId} homePodId={homeData.homePodId} className="" />

        <Devices homeId={homeId} homePodId={homeData.homePodId} />


      </div>
      <MyRoom homeId={homeId} />
    </div>
  );
};

export default HomePage;