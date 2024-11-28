import React, { useEffect, useState } from 'react'
import { HiChevronDown } from "react-icons/hi2"
import Dropdown from '../../../../components/Dropdown'

const DeviceCard = ({device, removeDevice }) => {
    const [isChecked, setIsChecked] = useState(device.status === 1)

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsChecked(device.status === 1)
    }, [device.status])
    
    const handleToggle = async () => {
        const newStatus = isChecked ? 0 : 1
        setIsChecked(!isChecked) 
        // await fetch('/api/device', {
        //     method: 'POST', // Hoặc PUT
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ status: newStatus }),
        // });
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


  return (
    <div className='flex flex-col relative inline-block justify-between gap-1 bg-[#272a30] rounded-lg shadow-lg p-4 md:p-6'>
        <div></div>
        <div className='flex justify-between pb-4 '>
            <label className="inline-flex items-center cursor-pointer shadow-lg">
            <input type="checkbox" value="" className="sr-only peer" checked={isChecked} onChange={handleToggle} />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <button onClick={toggleDropdown} type='button' className='flex justify-around gap-1 items-center cursor-pointer'>
                <h1 className='text-gray-500 dark:text-gray-400'>{device.name}</h1>
                <HiChevronDown className='text-[#808183] text-xl'/>
                {isOpen && (<Dropdown/>)}
            </button>
            
        </div>
        <div className='flex justify-between pl-1 text-gray-500 dark:text-gray-400 '>
            <span className='text-3xl font-bold'>{device.icon()}</span>
            <p className='font-bold'>{device.description}</p>
        </div>
        <button
                    onClick={() => removeDevice(device.name)}
                    className='text-red-500 hover:text-red-700'
                >
                    Delete
                </button>
        
    </div>
  )
}

export default DeviceCard