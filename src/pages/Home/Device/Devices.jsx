import DeviceCard from "./DeviceCard/DeviceCards";
import DeviceModal from "../../../components/DeviceModal";
import mockApi from "../../../apis/mockApi";
import getAllDevices from "../../../apis/Devices/GetAllDevices";
import axios from 'axios';

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
        case "CgSmartHomeRefrigerator":
          return CgSmartHomeRefrigerator;
        case "ImSwitch":
          return ImSwitch;
        case "PiLightbulbFilament":
          return PiLightbulbFilament;
        case "MdOutlineSensorDoor":
          return MdOutlineSensorDoor;
        default:
          return PiPlugCharging; // Default icon if not found
      }}

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);
    const toggleEditMode = () => setIsEditMode(!isEditMode);
  
    const [devices, setDevices] = useState([]);

    const fetchDevices = async () => {
        try {
            const devices = await getAllDevices();
            const mappedDevices = devices.data.map((device) => ({
                ...device,
                icon: getIconComponent(device.icon),
            }));
            setDevices(mappedDevices);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    const removeDevice = (deviceId) => {
      setDevices(devices.filter(device => device.id !== deviceId));
    };

    const addDevice = (newDevice) => {
    
          const deviceWithIcon = { ...newDevice, icon: getIconComponent(newDevice.icon) };
        setDevices((prevDevices) => [...prevDevices, deviceWithIcon]);
    };
   
  return (
    <div className='pb-4 max-w col-span-2 rounded-xl shadow bg-gradient-to-r from-[#1b1c1d] to-[#111b24] p-4 md:p-6'>
          <div className='flex justify-between items-center pb-6'>
            <h1 className='text-xl font-semibold text-white'>Device</h1>
            
            <div className='flex justify-between items-center'>
         
                <div className='flex justify-between gap-2'>
                    <button 
                        className={`flex justify-between items-center gap-[3px] rounded-md p-1 px-3 cursor-pointer transition-colors duration-300 ${isEditMode ? 'bg-blue-600 text-white' : 'text-gray-400 bg-gray-700'}`} 
                        onClick={toggleEditMode}
                    >
                        <p className=''>Edit</p>
                        <TiEdit/>
                    </button>
                
                    <button type="button" onClick={openModal} className='flex justify-between items-center gap-[3px] text-white bg-blue-600 rounded-md p-1 px-3 cursor-pointer '>
                        <p>Add Device</p>
                        <GoPlus/>
                    </button>

                </div>
            </div>
          </div>

          <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-4 '>
            {
              devices && devices.map((device)=> <DeviceCard device={device} removeDevice={removeDevice} isEditMode={isEditMode}/> )
            }
          </div>
         
           <DeviceModal isVisible={isModalVisible} onClose={closeModal} addDevice={addDevice} />
      </div>
  )
}

export default Devices