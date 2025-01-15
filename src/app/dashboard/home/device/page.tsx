import React from 'react'
import DeviceCard from './deviceId/page'
import { getAllDevices } from '@/apis/Devices/DeviceService'
import SensorSettingsModal from '@/components/SensorSettingsModal'
import { type LucideIcon } from 'lucide-react'
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
import { Card, CardContent } from '@/components/ui/card'
import { DeviceCreateDialog } from '@/components/device-create-dialog'
import DeviceSettingDialog from '@/components/device-setting-dialog'
import { motion, AnimatePresence } from 'framer-motion'

const Device = ({ homePodId, updatedDevices }) => {
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

    useEffect(() => {
        if (updatedDevices.length > 0) {
            setDevices((prevDevices) =>
                prevDevices.map((device) => {
                    const updated = updatedDevices.find((d) => d.id === device.id)
                    return updated ? { ...device, ...updated } : device
                })
            )
        }
    }, [updatedDevices])

    const removeDevice = (deviceId) => {
        setDevices(devices.filter((device) => device.id !== deviceId))
    }

    const addDevice = (newDevice) => {
        const deviceWithIcon = { ...newDevice, icon: newDevice.icon }
        setDevices((prevDevices) => [...prevDevices, deviceWithIcon])
    }

    // if (loading) {
    //     return (
    //         <div className='pb-4 max-w col-span-2 rounded-xl shadow bg-gradient-to-r from-[#1b1c1d] to-[#111b24] p-4 md:p-6'>
    //             <div className='flex justify-between items-center pb-4'>
    //                 <h1 className='text-lg sm:text-xl font-semibold text-white'>Quick Access</h1>
    //                 <div className='flex justify-between items-center'>
    //                     <div className='flex justify-between gap-2'>
    //                         <Button
    //                             className={`gap-1 bg-slate-600 text-white hover:bg-slate-500 transition-transform cursor-pointer transition-colors duration-300 ${
    //                                 isEditMode ? 'bg-blue-600 text-white' : 'text-gray-400 bg-gray-700'
    //                             }`}
    //                             onClick={toggleEditMode}
    //                         >
    //                             <TiEdit />
    //                             <p className='hidden sm:flex'>Edit</p>
    //                         </Button>

    //                         <DeviceSettingDialog devices={devices} homeId={homeId} />
    //                         <DeviceCreateDialog addDevice={addDevice} homePodId={homePodId} />
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <Card className='overflow-hidden bg-gradient-to-b from-gray-200 to-gray-300 dark:from-slate-900 dark:to-gray-900 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
                <h1 className='text-xl font-semibold text-gray-600 dark:text-white'>Quick Access</h1>
                <div className='flex flex-wrap gap-2'>
                    <Button
                        variant={isEditMode ? 'default' : 'secondary'}
                        size='sm'
                        onClick={toggleEditMode}
                        className={`gap-2 transition-colors duration-300 ${isEditMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-400 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600'} text-white`}
                    >
                        <TiEdit className='h-4 w-4' />
                        <span className='hidden sm:inline'>Edit</span>
                    </Button>
                    <DeviceSettingDialog devices={devices} homeId={homeId} />
                    <DeviceCreateDialog addDevice={addDevice} homePodId={homePodId} />
                </div>
            </div>

            {loading ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {[...Array(5)].map((_, index) => (
                        <Card key={index} className='relative overflow-hidden'>
                            <CardContent className='p-6'>
                                <div className='flex justify-between items-center mb-4'>
                                    <Skeleton className='h-5 w-12' />
                                    <Skeleton className='h-6 w-10 rounded-full' />
                                </div>
                                <div className='flex justify-center items-center mb-6'>
                                    <Skeleton className='h-20 w-20 rounded-full' />
                                </div>
                                <div className='text-center'>
                                    <Skeleton className='h-6 w-3/4 mx-auto mb-2' />
                                    <div className='flex items-center justify-center gap-2'>
                                        <Skeleton className='h-2 w-2 rounded-full' />
                                        <Skeleton className='h-4 w-24' />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <AnimatePresence>
                    <motion.div
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {devices.map((device) => (
                            <motion.div
                                key={device.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <DeviceCard
                                    device={device}
                                    homePodId={homePodId}
                                    removeDevice={removeDevice}
                                    isEditMode={isEditMode}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            )}
        </Card>
    )
}

export default Device

{
    /* <div className='pb-4 max-w col-span-2 rounded-xl shadow bg-gradient-to-r from-[#1b1c1d] to-[#111b24] p-4 md:p-6'>
<div className='flex justify-between items-center pb-4'>
    <h1 className='text-lg sm:text-xl font-semibold text-white'>Quick Access</h1>
    <div className='flex justify-between items-center'>
        <div className='flex justify-between gap-2'>
            <Button
                className={`gap-1 bg-slate-600 text-white hover:bg-slate-500 transition-transform cursor-pointer transition-colors duration-300 ${
                    isEditMode ? 'bg-blue-600 text-white' : 'text-gray-400 bg-gray-700'
                }`}
                onClick={toggleEditMode}
            >
                <TiEdit />
                <p className='hidden sm:flex'>Edit</p>
            </Button>

            <DeviceSettingDialog devices={devices} homeId={homeId} />
            <DeviceCreateDialog addDevice={addDevice} homePodId={homePodId} />
        </div>
    </div>
</div>

</div>
)
}

return (
<div className='h-full pb-4 max-w col-span-2 rounded-xl shadow bg-gradient-to-r from-[#1b1c1d] to-[#111b24] p-4 md:p-6 transition-all duration-300'>
<div className='flex justify-between items-center pb-4'>
<h1 className='text-lg sm:text-xl font-semibold text-white'>Quick Access</h1>

<div className='flex justify-between items-center'>
    <div className='flex justify-between gap-2'>
        <Button
            className={`gap-1 bg-slate-600 text-white hover:bg-slate-500 transition-transform cursor-pointer transition-colors duration-300 ${
                isEditMode ? 'bg-blue-600 text-white' : 'text-gray-400 bg-gray-700'
            }`}
            onClick={toggleEditMode}
        >
            <TiEdit />
            <p className='hidden sm:flex'>Edit</p>
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
) */
}
