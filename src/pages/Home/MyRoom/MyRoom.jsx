import React from 'react'
import DeivceRoomCard from './DeviceRoomCard/DeviceRoomCard.jsx'
import { GoPlus } from "react-icons/go";
import { TiEdit } from "react-icons/ti";

const MyRoom = () => {

  const rooms = [
    'Living Room',
    'Dining Room',
    'Bed Room',
    'Bath Room',
    'Backyard',
    'Garage',
  ];

    const devices = [
        {specific: "Humidifier", name: "Xiaomi-Mi", picture: "/humidifier.png"},
        {specific: "Speaker", name: "Google Speaker", picture: "/speaker.png"},
        {specific: "Camera", name: "Google Camera", picture: "/camera-cctv.png"},
        {specific: "Thermostat", name: "Google Thermostat", picture: "/thermostat.png"}
    ]
  return (
    <div className='rounded-xl shadow bg-[#1a1c1e] p-4 md:p-6'>
        <div className='flex justify-between items-center pb-6'>
            <h1 className='text-xl font-semibold text-gray-500 text-white'>My Rooms</h1>
            <div className='flex justify-between gap-2'>
              <div className='flex justify-between items-center gap-[3px] text-gray-500 dark:text-gray-400 dark:bg-gray-700 rounded-md p-1 px-2 sm:px-3  cursor-pointer'>
                <p className='hidden sm:flex'>Edit</p>
                <TiEdit/>
              </div>
              
              <div className=' flex justify-between items-center gap-[3px] text-gray-500 dark:text-white dark:bg-blue-600 rounded-md p-1 px-2 sm:px-3  cursor-pointer'>
                <p className='hidden sm:flex'>Add Device</p>
                <GoPlus/>
              </div>
            </div>
        </div>

        {/* <div className='text-gray-500 dark:text-gray-400 sm:flex justify-start gap-8 cursor-pointer pb-8 shadow-lg'>
            <p>Living Room</p>
            <p>Dining Room</p>
            <p>Bed Room</p>
            <p>Bath Room</p>
            <p>Backyard</p>
            <p>Garage</p>
        </div> */}

        <div className='sm:hidden'>
        <select className='w-full p-2 rounded-md bg-[#06080a] text-gray-500 mb-4'>
          {rooms.map((room, index) => (
            <option key={index} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>

      <div className='hidden sm:flex text-gray-500 justify-start gap-8 cursor-pointer pb-8 shadow-lg'>
        {rooms.map((room, index) => (
          <p key={index}>{room}</p>
        ))}
      </div>
        
        <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4 '>
            <div className='flex flex-col justify-between gap-4 shadow-lg'>
                <img src="/room-prv.png" alt="" className='rounded-xl object-fill w-full h-full object-cover' />
                {/* <div className='bg-white p-4 flex items-center justify-center'>hello</div> */}
              
            </div>

            <div className='row-span-2'>
                <div className='grid grid-cols-2 gap-4 h-full'>
                    {
                        devices && devices.map((deviceRoom)=> <DeivceRoomCard deviceRoom={deviceRoom} />)
                    }
                </div>
            </div>

            <div className='p-8 bg-[#272a30] rounded-xl shadow-lg'>Music player</div>

        </div>

      </div>
  )
}

export default MyRoom