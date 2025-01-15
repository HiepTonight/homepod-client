import React, { useState } from 'react'
import DeivceRoomCard from './DeviceRoomCard/DeviceRoomCard.jsx'
import { Button } from '@/components/ui/button'
import { DeviceCreateDialog } from '@/components/device-create-dialog'
import { GoPlus } from 'react-icons/go'
import { TiEdit } from 'react-icons/ti'

import { MusicPlayer } from '@/components/music-player'

const MyRoom = () => {
    const rooms = ['Living Room', 'Dining Room', 'Bed Room', 'Bath Room', 'Backyard', 'Garage']

    const devices = [
        { specific: 'Humidifier', name: 'Xiaomi-Mi', picture: '/humidifier.png' },
        { specific: 'Speaker', name: 'Google Speaker', picture: '/speaker.png' },
        { specific: 'Camera', name: 'Google Camera', picture: '/camera-cctv.png' },
        { specific: 'Thermostat', name: 'Google Thermostat', picture: '/thermostat.png' }
    ]

    const [isEditMode, setIsEditMode] = useState(false)

    const toggleEditMode = () => setIsEditMode(!isEditMode)

    return (
        <div className='rounded-xl shadow bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6'>
            <div className='flex justify-between items-center pb-6'>
                <h1 className='text-xl font-semibold text-gray-600 dark:text-white'>My Rooms</h1>
                <div className='flex justify-between gap-2'>
                    <Button
                        variant={isEditMode ? 'default' : 'secondary'}
                        size='sm'
                        onClick={toggleEditMode}
                        className={`gap-2 ${isEditMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-400 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600'} text-white`}
                    >
                        <TiEdit className='h-4 w-4' />
                        <span className='hidden sm:inline'>Edit</span>
                    </Button>
                    <DeviceCreateDialog />
                </div>
            </div>

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
                    <img src='/room-prv.png' alt='' className='rounded-xl object-fill w-full h-full object-cover' />
                    {/* <div className='bg-white p-4 flex items-center justify-center'>hello</div> */}
                </div>

                <div className='row-span-2'>
                    <div className='grid grid-cols-2 gap-4 h-full'>
                        {devices && devices.map((deviceRoom) => <DeivceRoomCard deviceRoom={deviceRoom} />)}
                    </div>
                </div>

                {/* <div
                    className='p-8 bg-gradient-to-br from-gray-50 to-gray-100 
                          dark:from-gray-800 dark:to-gray-900
                          border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg'
                >
                    Music player
                </div> */}
                <MusicPlayer />
            </div>
        </div>
    )
}

export default MyRoom
