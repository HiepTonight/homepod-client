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
import React from 'react'

const SensorData = ({ homePodId }) => {
    const [temp, setTemp] = useState(null)
    const [humi, setHumi] = useState(null)
    const [light, setLight] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleMessage = (data) => {
            console.log('Received message:', data)
            setTemp(data.temp)
            setHumi(data.humi)
            setLight(data.light)
            setLoading(false)
        }

        // Handle connection errors
        const handleError = (error) => {
            console.error('MQTT error:', error)
        }

        connect(homePodId, handleMessage, handleError)

        return () => {
            disconnect(homePodId)
        }
    }, [homePodId])

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
            <div className='p-5 shadow bg-gradient-to-r from-[#1a1c1e] to-[#090d11] rounded-xl'>
                <h1 className='text-xl font-semibold text-white mb-4 '>Sensor Data</h1>
                <div className='p-2 grid grid-cols-2 gap-8 animate-pulse'>
                    <div className='space-y-3 text-gray-300'>
                        <div className='h-8 bg-gray-700 rounded w-24'></div>
                        <div className='flex items-center space-x-2'>
                            <FaTemperatureHalf className='text-yellow-500' />{' '}
                            <div className='h-4 bg-gray-700 rounded w-16'></div>
                        </div>
                    </div>
                    <div className='space-y-3 text-gray-300'>
                        <div className='h-8 bg-gray-700 rounded w-24'></div>
                        <div className='flex items-center space-x-2'>
                            <MdWaterDrop className='text-blue-500' />{' '}
                            <div className='h-4 bg-gray-700 rounded w-16'></div>
                        </div>
                    </div>
                    <div className='space-y-3 text-gray-300'>
                        <div className='h-8 bg-gray-700 rounded w-24'></div>
                        <div className='flex items-center space-x-2'>
                            <CiLight className='text-yellow-300' /> <div className='h-4 bg-gray-700 rounded w-16'></div>
                        </div>
                    </div>
                    <div className='space-y-3 text-gray-300'>
                        <div className='h-8 bg-gray-700 rounded w-24'></div>
                        <div className='flex items-center space-x-2'>
                            <TbAirConditioning className='text-green-500' />{' '}
                            <div className='h-4 bg-gray-700 rounded w-16'></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        // <div className='p-5 shadow bg-gradient-to-r from-[#1a1c1e] to-[#090d11] rounded-xl'>
        //   <h1 className='text-2xl font-bold text-white mb-4'>Sensor Data</h1>
        //   <div className='p-2 grid grid-cols-2 gap-8'>
        //     <div className='space-y-3 text-gray-300'>
        //       <h1 className='text-2xl font-bold'>{temp} ℃</h1>
        //       <p className='flex items-center space-x-2'>
        //         <FaTemperatureHalf className="text-yellow-500"/> <span>Temperature</span>
        //       </p>
        //     </div>

        //     <div className='space-y-3 text-gray-300'>
        //       <h1 className='text-2xl font-bold'>{humi} %</h1>
        //       <p className='flex items-center space-x-2'>
        //         <MdWaterDrop className="text-blue-500"/> <span>Humidity</span>
        //       </p>
        //     </div>

        //     <div className='space-y-3 text-gray-300'>
        //       <h1 className='text-2xl font-bold'>{light} %</h1>
        //       <p className='flex items-center space-x-2'>
        //         <CiLight className="text-yellow-300"/> <span>Light</span>
        //       </p>
        //     </div>

        //     <div className='space-y-3 text-gray-300'>
        //       <h1 className='text-2xl font-bold'>50</h1>
        //       <p className='flex items-center space-x-2'>
        //         <TbAirConditioning className="text-green-500"/> <span>Air Quality</span>
        //       </p>
        //     </div>
        //   </div>
        // </div>
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
