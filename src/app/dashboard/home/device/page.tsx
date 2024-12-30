import React from 'react'
import DeviceCard from './deviceId/page'
import getAllDevices from '@/apis/Devices/GetAllDevices'
import SensorSettingsModal from '@/components/SensorSettingsModal'
import { type LucideIcon } from "lucide-react"
import { Skeleton } from '@/components/ui/skeleton'
import { CgSmartHomeRefrigerator } from 'react-icons/cg'
import { PiPlugCharging, PiLightbulbFilament } from 'react-icons/pi'
import { ImSwitch } from 'react-icons/im'
import { MdOutlineSensorDoor } from 'react-icons/md'
import { GoPlus } from 'react-icons/go'
import { TiEdit } from 'react-icons/ti'
import { IoMdSettings } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { DeviceCreateDialog } from '@/components/device-create-dialog'
import DeviceSettingDialog from '@/components/device-setting-dialog'

const Device = ({ homePodId }) => {
    const [searchParams] = useSearchParams()
    const homeId = searchParams.get('id')

    const getIconComponent = (iconName) => {
        switch (iconName) {
            case 'CgSmartHomeRefrigerator':
                return CgSmartHomeRefrigerator
            case 'ImSwitch':
                return ImSwitch
            case 'PiLightbulbFilament':
                return PiLightbulbFilament
            case 'MdOutlineSensorDoor':
                return MdOutlineSensorDoor
            default:
                return PiPlugCharging // Default icon if not found
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [isSensorSettingsVisible, setIsSensorSettingsVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    const openModal = () => setIsModalVisible(true)
    const closeModal = () => setIsModalVisible(false)
    const toggleEditMode = () => setIsEditMode(!isEditMode)
    const openSensorSettings = () => setIsSensorSettingsVisible(true)
    const closeSensorSettings = () => setIsSensorSettingsVisible(false)

    const [devices, setDevices] = useState([])

    const fetchDevices = async () => {
        try {
            const devices = await getAllDevices(homePodId)
            // console.log('Devices:', devices)
            const mappedDevices = devices.map((device) => ({
                ...device,
                icon: getIconComponent(device.icon)
            }))
            setDevices(devices)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching devices:', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDevices()
    }, [homeId])

    const removeDevice = (deviceId) => {
        setDevices(devices.filter((device) => device.id !== deviceId))
    }

    const addDevice = (newDevice) => {
        const deviceWithIcon = { ...newDevice, icon: newDevice.icon }
        setDevices((prevDevices) => [...prevDevices, deviceWithIcon])
    }

    if (loading) {
        return (
            <div className='pb-4 max-w col-span-2 rounded-xl shadow bg-gradient-to-r from-[#1b1c1d] to-[#111b24] p-4 md:p-6'>
                <div className='flex justify-between items-center pb-6'>
                    <h1 className='text-sm sm:text-xl font-semibold text-white'>Device</h1>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-between gap-2'>
                            <button
                                className={`flex justify-between items-center gap-[3px] rounded-md p-1 px-3 cursor-pointer transition-colors duration-300 ${
                                    isEditMode ? 'bg-blue-600 text-white' : 'text-gray-400 bg-gray-700'
                                }`}
                                onClick={toggleEditMode}
                            >
                                <p className='hidden sm:flex'>Edit</p>
                                <TiEdit />
                            </button>

                            <button
                                onClick={openSensorSettings}
                                className='flex justify-between items-center gap-[3px] text-white bg-gray-600 px-4 py-2 rounded-md'
                            >
                                Settings
                                <IoMdSettings />
                            </button>

                            <button
                                type='button'
                                onClick={openModal}
                                className='flex justify-between items-center gap-[3px] text-white bg-blue-600 rounded-md p-1 px-3 cursor-pointer '
                            >
                                <p className='hidden sm:flex'>Add Device</p>
                                <GoPlus />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='grid md:grid-cols-2 xl:grid-cols-5 gap-4 animate-pulse'>
                    {[...Array(5)].map((_, index) => (
                        <Skeleton className='h-56 bg-[#272a30]' />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='pb-4 max-w col-span-2 rounded-xl shadow bg-gradient-to-r from-[#1b1c1d] to-[#111b24] p-4 md:p-6 transition-all duration-300'>
            <div className='flex justify-between items-center pb-4'>
                <h1 className='text-lg sm:text-xl font-semibold text-white'>Device</h1>

                <div className='flex justify-between items-center'>
                    <div className='flex justify-between gap-2'>
                        <Button
                            className={`gap-1 bg-slate-600 text-white hover:bg-slate-500 transition-transform cursor-pointer transition-colors duration-300 ${
                                isEditMode ? 'bg-blue-600 text-white' : 'text-gray-400 bg-gray-700'
                            }`}
                            onClick={toggleEditMode}
                        >
                            <p className='hidden sm:flex'>Edit</p>
                            <TiEdit />
                        </Button>

                        <DeviceSettingDialog devices={devices} homeId={homeId} />
                        <DeviceCreateDialog addDevice={addDevice} homePodId={homePodId} />
                    </div>
                </div>
            </div>

            <div className='grid md:grid-cols-2 xl:grid-cols-5 gap-4 '>
                {devices &&
                    devices.map((device) => (
                        <div key={device.id} className='hover:scale-105 transition-transform'>
                            <DeviceCard
                                key={device.id}
                                device={device}
                                homePodId={homePodId}
                                removeDevice={removeDevice}
                                isEditMode={isEditMode}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Device
