import { IoWifiOutline } from "react-icons/io5";
import { VscPlug } from "react-icons/vsc";

const DeviceRoomCard = ({deviceRoom}) => {
  return (
    <div className='flex flex-col gap-2 bg-[#272a30] rounded-lg shadow-lg' >
        <div className="flex justify-between p-4">
            <div className="p-2 max-w-40 max-h-40">
                <img src={deviceRoom.picture} alt="" className="" />
            </div>
            <div className="flex flex-col gap-4 items-center pt-5">
                <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:ring-blue-800 rounded-full peer bg-black peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                <div className="rounded-full dark:bg-sky-800 p-1">
                    <IoWifiOutline />
                </div>
                <div className="rounded-full dark:bg-lime-600 p-1">
                    <VscPlug/>
                </div>
                
            </div>
            
        </div>
        
        <div className="flex flex-col pl-6 pb-6 justify-end h-full">
            <h1 className="text-gray-500 dark:text-white text-xl font-normal">{deviceRoom.specific}</h1>
            <pc className='text-gray-500'>{deviceRoom.name}</pc>
        </div>
    </div>
  )
}

export default DeviceRoomCard