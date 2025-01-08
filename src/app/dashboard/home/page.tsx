import React, { useEffect, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getHome, connectEventSource, getStreamAxios } from '@/apis/Homes/HomeService'
import getHomeDetails from '../../../apis/Homes/GetUserHome'
import SensorData from './sensorData/page'
import WeatherForecast from '@/pages/Home/WeatherForecast/WeatherForecast'
import DataStatics from '@/pages/Home/DataStatics/DataStatics'
import Devices from './device/page'
import MyRoom from '@/pages/Home/MyRoom/MyRoom'
import { set } from 'date-fns'

const HomePage = () => {
    const [searchParams] = useSearchParams()
    // const { onHomeNameChange } = useOutletContext()
    const homeId = searchParams.get('id')
    const [homeData, setHomeData] = useState(null)
    const [updatedDevices, setUpdatedDevices] = useState([])
    const [updatedSensorData, setUpdatedSensorData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHomeDetails = async () => {
            try {
                const data = await getHome(homeId)
                setHomeData(data)
                setLoading(false)
                // console.log(onHomeNameChange(data.name))
            } catch (error) {
                console.error('Error fetching home details:', error)
                setLoading(false)
            }
        }

        fetchHomeDetails()

        return () => {
            // console.log('Component unmounted')
            setHomeData(null)
        }
    }, [homeId])

    useEffect(() => {
        let timeout
        let retryCount = 0
        const maxRetries = 5
        let isMounted = true

        if (!homeData?.homePodId) return

        const connectEventSource = () => {
            const eventSource = new EventSource(
                `http://localhost:8080/api/v1/home/sse?homePodId=${homeData?.homePodId}`
            )

            eventSource.onopen = () => {
                console.log('Connection to EventSource established successfully.')
                retryCount = 0
            }

            eventSource.addEventListener('DEVICE_UPDATE_EVENT', (event) => {
                try {
                    const data = JSON.parse(event.data);
                    setUpdatedDevices(data);
                } catch (error) {
                    console.error('Error parsing event data:', error);
                }
            });

            eventSource.addEventListener('SENSOR_DATA_UPDATE_EVENT', (event) => {
                const data = JSON.parse(event.data)
                setUpdatedSensorData(data)
                console.log('EventSource message:', data)
            })

            eventSource.onerror = (error) => {
                console.error('EventSource error:', error)
                if (error.eventPhase === EventSource.CLOSED) {
                    eventSource.close()
                    if (retryCount < maxRetries && isMounted) {
                        retryCount++
                        timeout = setTimeout(connectEventSource, 1000) // Thiết lập lại kết nối sau 1 giây
                    } else {
                        console.error('Max retries reached. Stopping reconnection attempts.')
                    }
                }
            }

            return eventSource
        }

        const eventSource = connectEventSource()

        return () => {
            console.log('Closing EventSource connection due to component unmount or page navigation.')
            isMounted = false
            eventSource.close()
            clearTimeout(timeout)
        }
    }, [homeData?.homePodId])

    if (loading) {
        return (
            <div className='p-5'>
                <div className='flex flex-col xl:grid xl:grid-cols-2 gap-4 pb-5'>
                    <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
                        <Skeleton className='h-72 mb-4' />
                        <Skeleton className='h-72 mb-4' />
                    </div>
                    <Skeleton className='h-72 mb-4' />
                    <Skeleton className='h-52 col-span-2 mb-4' />
                </div>
                <Skeleton className='h-96 mb-4' />
            </div>
        )
    }

    if (!homeData) {
        return (
            <div>
                <div className='p-5'>
                    <div className='flex flex-col xl:grid xl:grid-cols-2 gap-4 pb-5'>
                        <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
                            <Skeleton className='h-72 mb-4' />
                            <Skeleton className='h-72 mb-4' />
                        </div>
                        <Skeleton className='h-72 mb-4' />
                        <Skeleton className='h-52 col-span-2 mb-4' />
                    </div>
                    <Skeleton className='h-96 mb-4' />
                </div>
            </div>
        )
    }

    return (
        <div className='p-5'>
            <div className='flex flex-col xl:grid xl:grid-cols-2 gap-4 pb-5'>
                <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
                    <SensorData homeId={homeId} homePodId={homeData.homePodId} />
                    <WeatherForecast homeId={homeId} homePodId={homeData.homePodId} />
                </div>
                <DataStatics homeId={homeId} homePodId={homeData.homePodId} className='' />

                <Devices homeId={homeId} homePodId={homeData.homePodId} updatedDevices={updatedDevices} />
            </div>
            <MyRoom homeId={homeId} />
        </div>
    )
}

export default HomePage
