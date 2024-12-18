import React, { useEffect, useState } from 'react'
import { HiChevronDown } from "react-icons/hi2"
import { IoTrashOutline } from "react-icons/io5";

import Dropdown from '../../../../components/Dropdown'
import deleteDevice from '../../../../apis/Devices/DeleteDevice'
import triggerDevice from '../../../../apis/Devices/TriggerDevice'

const DeviceCard = ({device, removeDevice, isEditMode, homePodId }) => {
    const [isChecked, setIsChecked] = useState(device.status === 1)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsChecked(device.status === 1)
    }, [device.status])
    
    const handleToggle = async () => {
        const newStatus = isChecked ? 0 : 1
        setIsChecked(!isChecked) 
        try {
            await triggerDevice(device.id, homePodId);
            console.log('Device triggered:', device.id, homePodId);
        } catch (error) {
            console.error('Error triggering device:', error);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteDevice(device.id);
            removeDevice(device.id);
        } catch (error) {
            console.error('Error deleting device:', error);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div className='flex flex-col relative inline-block justify-between gap-1 bg-[#272a30] rounded-lg shadow-lg p-4 md:p-6'>
        <button
            onClick={handleDelete}
            className={`flex justify-center items-center absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-red-500 text-white hover:bg-red-700 transition-opacity duration-300 ${isEditMode ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
            <IoTrashOutline/>
        </button>
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
            <span className='text-3xl font-bold'>{React.createElement(device.icon)}</span>
            <p className='font-bold'>{device.description}</p>
        </div>
    </div>
  )
}

export default DeviceCard