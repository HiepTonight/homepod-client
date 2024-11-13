import React, { useEffect, useState } from 'react'

const DeviceCard = ({device}) => {
    const [isChecked, setIsChecked] = useState(device.status === 1)

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

  return (
    <div className='flex flex-col justify-between gap-1 bg-white rounded-xl shadow dark:bg-gray-800 p-4 md:p-6'>
        <div></div>
        <div className='flex justify-between pb-4'>
            <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" checked={isChecked} onChange={handleToggle} />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <h1 className='text-gray-500 dark:text-gray-400'>{device.name}</h1>
        </div>
        <div className='flex justify-between pl-1 text-gray-500 dark:text-gray-400 '>
            <span className='text-3xl font-bold'>{device.icon()}</span>
            <p className='font-bold'>{device.description}</p>
        </div>
    </div>
  )
}

export default DeviceCard