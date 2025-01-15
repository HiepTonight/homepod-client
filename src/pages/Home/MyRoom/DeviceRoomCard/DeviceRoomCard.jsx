import { IoWifiOutline } from 'react-icons/io5'
import { VscPlug } from 'react-icons/vsc'
import { Switch } from '@/components/ui/switch'

const DeviceRoomCard = ({ deviceRoom }) => {
    return (
        <div
            className='flex flex-col gap-2 bg-gradient-to-br from-gray-50 to-gray-100 
                          dark:from-gray-800 dark:to-gray-900
                          border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg'
        >
            <div className='flex justify-between p-4'>
                <div className='p-2 max-w-40 max-h-40'>
                    <img src={deviceRoom.picture} alt='' className='' />
                </div>
                <div className='flex flex-col gap-4 items-center pt-5'>
                    <Switch />
                    <div className='rounded-full dark:bg-sky-800 p-1'>
                        <IoWifiOutline />
                    </div>
                    <div className='rounded-full dark:bg-lime-600 p-1'>
                        <VscPlug />
                    </div>
                </div>
            </div>

            <div className='flex flex-col pl-6 pb-6 justify-end h-full'>
                <h1 className='dark:text-white text text-base sm:text-xl font-normal'>{deviceRoom.specific}</h1>
                <pc className='text-sm sm:text-base text-gray-500'>{deviceRoom.name}</pc>
            </div>
        </div>
    )
}

export default DeviceRoomCard
