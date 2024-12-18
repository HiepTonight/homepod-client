import DeviceCard from "./DeviceCard/DeviceCards";
import DeviceModal from "../../../components/DeviceModal";
import getAllDevices from "../../../apis/Devices/GetAllDevices";
import SensorSettingsModal from "../../../components/SensorSettingsModal";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { PiPlugCharging, PiLightbulbFilament } from "react-icons/pi";
import { ImSwitch } from "react-icons/im";
import { MdOutlineSensorDoor } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { TiEdit } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Devices = ( {homePodId} ) => {
  const { homeId } = useParams();

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
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSensorSettingsVisible, setIsSensorSettingsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  const toggleEditMode = () => setIsEditMode(!isEditMode);
  const openSensorSettings = () => setIsSensorSettingsVisible(true);
  const closeSensorSettings = () => setIsSensorSettingsVisible(false);

  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    try {
      const devices = await getAllDevices(homeId);
      const mappedDevices = devices.map((device) => ({
        ...device,
        icon: getIconComponent(device.icon),
      }));
      setDevices(mappedDevices);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching devices:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [homeId]);

  const removeDevice = (deviceId) => {
    setDevices(devices.filter((device) => device.id !== deviceId));
  };

  const addDevice = (newDevice) => {
    const deviceWithIcon = { ...newDevice, icon: getIconComponent(newDevice.icon) };
    setDevices((prevDevices) => [...prevDevices, deviceWithIcon]);
  };

  if (loading) {
    return (
      <div className="pb-4 max-w col-span-2 rounded-xl shadow bg-gradient-to-r from-[#1b1c1d] to-[#111b24] p-4 md:p-6">
        <div className="flex justify-between items-center pb-6">
          <h1 className="text-xl font-semibold text-white">Device</h1>
          <div className="flex justify-between items-center">
            <div className="flex justify-between gap-2">
              <button
                className={`flex justify-between items-center gap-[3px] rounded-md p-1 px-3 cursor-pointer transition-colors duration-300 ${
                  isEditMode ? "bg-blue-600 text-white" : "text-gray-400 bg-gray-700"
                }`}
                onClick={toggleEditMode}
              >
                <p className="">Edit</p>
                <TiEdit />
              </button>

              <button
                onClick={openSensorSettings}
                className="flex justify-between items-center gap-[3px] text-white bg-gray-600 px-4 py-2 rounded-md"
              >
                Settings
                <IoMdSettings />
              </button>

              <button
                type="button"
                onClick={openModal}
                className="flex justify-between items-center gap-[3px] text-white bg-blue-600 rounded-md p-1 px-3 cursor-pointer "
              >
                <p>Add Device</p>
                <GoPlus />
              </button>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 animate-pulse">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-32 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4 max-w col-span-2 rounded-xl shadow bg-gradient-to-r from-[#1b1c1d] to-[#111b24] p-4 md:p-6">
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-xl font-semibold text-white">Device</h1>

        <div className="flex justify-between items-center">
          <div className="flex justify-between gap-2">
            <button
              className={`flex justify-between items-center gap-[3px] rounded-md p-1 px-3 cursor-pointer transition-colors duration-300 ${
                isEditMode ? "bg-blue-600 text-white" : "text-gray-400 bg-gray-700"
              }`}
              onClick={toggleEditMode}
            >
              <p className="">Edit</p>
              <TiEdit />
            </button>

            <button
              onClick={openSensorSettings}
              className="flex justify-between items-center gap-[3px] text-white bg-gray-600 px-4 py-2 rounded-md"
            >
              Settings
              <IoMdSettings />
            </button>

            <button
              type="button"
              onClick={openModal}
              className="flex justify-between items-center gap-[3px] text-white bg-blue-600 rounded-md p-1 px-3 cursor-pointer "
            >
              <p>Add Device</p>
              <GoPlus />
            </button>

            <SensorSettingsModal
              isVisible={isSensorSettingsVisible}
              onClose={closeSensorSettings}
              devices={devices}
              homeId={homeId}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 ">
        {devices &&
          devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              homePodId={homePodId}
              removeDevice={removeDevice}
              isEditMode={isEditMode}
            />
          ))}
      </div>

      <DeviceModal
        isVisible={isModalVisible}
        onClose={closeModal}
        addDevice={addDevice}
        homeId={homeId}
      />
    </div>
  );
};

export default Devices;