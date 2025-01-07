import { useEffect, useRef, useState } from 'react'
import { FaTemperatureHalf } from 'react-icons/fa6'
import { MdWaterDrop } from 'react-icons/md'
import { CiLight } from 'react-icons/ci'
import { LuWaves } from 'react-icons/lu'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { RiWaterPercentLine } from 'react-icons/ri'
import { TbAirConditioning } from 'react-icons/tb'
import getLatestSensorData from '@/apis/SensorData/getLatestSensorData.js'
import { connect, disconnect } from '@/apis/Mqtt.js'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SensorData = ({ homePodId }) => {
    const [temp, setTemp] = useState(null)
    const [humi, setHumi] = useState(null)
    const [light, setLight] = useState(null)
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     const handleMessage = (data) => {
    //         console.log('Received message:', data)
    //         setTemp(data.temp)
    //         setHumi(data.humi)
    //         setLight(data.light)
    //         setLoading(false)
    //     }

    //     // Handle connection errors
    //     const handleError = (error) => {
    //         console.error('MQTT error:', error)
    //     }

    //     connect(homePodId, handleMessage, handleError)

    //     return () => {
    //         disconnect(homePodId)
    //     }
    // }, [homePodId])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLatestSensorData(homePodId)
                // console.log('Sensor data:', homePodId);
                setTemp(data.data.temp.toFixed(1))
                setHumi(data.data.humi.toFixed(1))
                setLight(data.data.light.toFixed(1))
                setLoading(false)
            } catch (err) {
                console.log(err.message || 'Có lỗi xảy ra khi gọi API')
            }
        }

        fetchData()
    }, [homePodId])

    if (loading) {
        return (
            <div className='grid grid-cols-2 gap-4 justify-center'>
                <div className='col-span-2 bg-gradient-to-r from-[#73743c] to-[#3d4210] flex flex-col justify-between p-4 rounded-lg shadow-lg'>
                    <div className='flex items-center justify-between'>
                        <HiOutlineLightBulb className='text-4xl' />
                        <Switch />
                    </div>
                    <div className='flex justify-between items-end'>
                        <div className='flex gap-2 flex-col items-start'>
                            <Skeleton className='h-4 w-16' />
                            <Skeleton className='h-4 w-24' />
                            <Skeleton className='h-4 w-20' />
                        </div>
                        <div className='flex gap-2 flex-col items-end'>
                            <Skeleton className='h-4 w-12' />
                            <Skeleton className='h-4 w-16' />
                            <Skeleton className='h-4 w-20' />
                        </div>
                    </div>
                </div>
                <div className='bg-gradient-to-r from-[#2a4174] to-[#091a41] flex flex-col justify-center p-4 gap-4 rounded-lg shadow-lg'>
                    <p className='font-light text-xl'>Humidity</p>{' '}
                    <div className='flex items-center justify-between'>
                        <RiWaterPercentLine className='text-2xl 3xl:text-3xl' />
                        <Skeleton className='h-6 w-12' />
                    </div>
                </div>
                <div className='bg-gradient-to-r from-[#2a4174] to-[#091a41] flex flex-col justify-center p-4 gap-4 rounded-lg shadow-lg'>
                    <p className='font-light text-xl'>Heat</p>
                    <div className='flex items-center justify-between'>
                        <LuWaves className='text-2xl 3xl:text-3xl' />
                        <Skeleton className='h-6 w-12' />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-2 gap-4 justify-center'>
            <div className='col-span-2 bg-gradient-to-r from-[#73743c] to-[#3d4210] flex flex-col justify-between p-4 rounded-lg shadow-lg'>
                <div className='flex items-center justify-between'>
                    <HiOutlineLightBulb className='text-4xl' />
                    <Switch />
                </div>
                <div className='flex justify-between items-end'>
                    <div className='flex flex-col items-start'>
                        <h1 className='font-medium'>Light</h1>
                        <p className='font-light animate-pulse'>Device</p>
                        <p className='font-light'>250kWh</p>
                    </div>
                    <div className='flex flex-col items-end'>
                        <h1 className='font-medium'>{light} % </h1>
                        <h1 className='font-medium animate-pulse'>....</h1>
                        <p className='font-light'>Power on time</p>
                    </div>
                </div>
            </div>
            <div className='bg-gradient-to-r from-[#2a4174] to-[#091a41] flex flex-col justify-center p-4 gap-4 rounded-lg shadow-lg'>
                <p className='font-light text-xl'>Humidity</p>
                <div className='flex items-center justify-between'>
                    <RiWaterPercentLine className='text-2xl 3xl:text-3xl' />
                    <h1 className='font-medium text-2xl 3xl:text-3xl'>{humi} %</h1>
                </div>
            </div>
            <div className='bg-gradient-to-r from-[#2a4174] to-[#091a41] flex flex-col justify-center p-4 gap-4 rounded-lg shadow-lg'>
                <p className='font-light text-xl'>Heat</p>
                <div className='flex items-center justify-between'>
                    <LuWaves className='text-2xl 3xl:text-3xl' />
                    <h1 className='font-medium text-2xl 3xl:text-3xl'>{temp} °C</h1>
                </div>
            </div>
        </div>
    )
}

export default SensorData
