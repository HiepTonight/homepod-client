import React from 'react'
import { FaTemperatureHalf } from "react-icons/fa6";
import { MdWaterDrop } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { TbAirConditioning } from "react-icons/tb";

const PLatforms = () => {
  return (
    <div className='p-5 shadow dark:bg-gray-800 rounded-xl'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Data</h1>
        <div className='p-2 grid grid-cols-2 gap-8'>
            <div className='space-y-3 text-gray-500 dark:text-gray-400'>
                <h1 className='text-2xl font-bold'>25 ℃</h1>
                <p className='flex items-center space-x2'>
                    <FaTemperatureHalf/> <span>Temperature</span>
                </p>
            </div>
            
            <div className='space-y-3 text-gray-500 dark:text-gray-400'>
                <h1 className='text-2xl font-bold'>60 %</h1>
                <p className='flex items-center space-x2'>
                    <MdWaterDrop/> <span>Humidity</span>
                </p>
            </div>
            
            <div className='space-y-3 text-gray-500 dark:text-gray-400'>
                <h1 className='text-2xl font-bold'>80 %</h1>
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

export default PLatforms