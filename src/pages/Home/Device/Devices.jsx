import DeviceCard from "./DeviceCard/DeviceCards";
import DeviceModal from "../../../components/DeviceModal";
import mockApi from "../../../apis/mockApi";

import { CgSmartHomeRefrigerator } from "react-icons/cg"
import { PiPlugCharging } from "react-icons/pi"
import { PiLightbulbFilament } from "react-icons/pi"
import { ImSwitch } from "react-icons/im";
import { MdOutlineSensorDoor } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { TiEdit } from "react-icons/ti"
import { useEffect, useState } from "react";

const Devices = () => {
    const getIconComponent = (iconName) => {
      switch (iconName) {
        case "Refrigerator":
          return CgSmartHomeRefrigerator;
        case "Switch":
          return ImSwitch;
        case "Light Bulb":
          return PiLightbulbFilament;
        case "Door":
          return MdOutlineSensorDoor;
        default:
          return PiPlugCharging; // Icon mặc định nếu không tìm thấy
      }}

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);
  
    const [devices, setDevices] = useState([]);

    useEffect(() => {
      const mappedDevices = mockApi.map((device) => ({
        ...device,
        icon: getIconComponent(device.icon),
      }));
      setDevices(mappedDevices);
    }, []);

    const removeDevice = (deviceName) => {
      setDevices(devices.filter(device => device.name !== deviceName));
    };
   
    console.log(mockApi)
  return (
    <div className='pb-4 max-w col-span-2 rounded-xl shadow bg-[#1a1c1e] p-4 md:p-6'>
          <div className='flex justify-between items-center pb-6'>
            <h1 className='text-xl font-semibold text-white'>Device</h1>
            
            <div className='flex justify-between items-center'>
         
                <div className='flex justify-between gap-2'>
                    <button className='flex justify-between items-center gap-[3px] text-gray-500 dark:text-gray-400 dark:bg-gray-700 rounded-md p-1 px-3 cursor-pointer '>
                        <p className=''>Edit</p>
                        <TiEdit/>
                    </button>
                
                    <button type="button" onClick={openModal} className='flex justify-between items-center gap-[3px] text-gray-500 dark:text-white dark:bg-blue-600 rounded-md p-1 px-3 cursor-pointer '>
                        <p>Add Device</p>
                        <GoPlus/>
                    </button>

                </div>
            </div>
          </div>

          <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-4 '>
            {
              devices && devices.map((device)=> <DeviceCard device={device} removeDevice={removeDevice}/> )
            }
          </div>
         
           <DeviceModal isVisible={isModalVisible} onClose={closeModal} />
      </div>
  )
}

export default Devices