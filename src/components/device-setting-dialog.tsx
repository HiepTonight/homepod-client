import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { GoPlus } from 'react-icons/go'
import { TiEdit } from 'react-icons/ti'
import { FaMinus } from 'react-icons/fa'
import getHomeOption from '../apis/Homes/GetHomeOption'
import applyHomeOption from '../apis/Homes/ApplyHomeOption'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings } from 'lucide-react'
import { toast } from 'sonner'
import { PlugZap, Heater, Tv, Refrigerator, SquarePower, Lightbulb, Bolt, DoorClosed } from 'lucide-react'


const DeviceSettingDialog = ({ devices, homeId }) => {
    const [settings, setSettings] = useState({
        temperature: {
            high: '',
            low: '',
            highDevices: [],
            lowDevices: []
        },
        humidity: {
            high: '',
            low: '',
            highDevices: [],
            lowDevices: []
        },
        light: {
            high: '',
            low: '',
            highDevices: [],
            lowDevices: []
        }
    })

    useEffect(() => {
        const fetchHomeOption = async () => {
            try {
                const data = await getHomeOption(homeId)
                setControlType(data.data.controlType)
                setSettings({
                    temperature: {
                        high: data.data.tempAutoOption.high ?? '',
                        low: data.data.tempAutoOption.low ?? '',
                        highDevices: data.data.tempAutoOption.highDevices,
                        lowDevices: data.data.tempAutoOption.lowDevices
                    },
                    humidity: {
                        high: data.data.humiAutoOption.high ?? '',
                        low: data.data.humiAutoOption.low ?? '',
                        highDevices: data.data.humiAutoOption.highDevices,
                        lowDevices: data.data.humiAutoOption.lowDevices
                    },
                    light: {
                        high: data.data.lightAutoOption.high ?? '',
                        low: data.data.lightAutoOption.low ?? '',
                        highDevices: data.data.lightAutoOption.highDevices,
                        lowDevices: data.data.lightAutoOption.lowDevices
                    }
                })
            } catch (error) {
                console.error('Error fetching home option:', error)
            }
        }

        fetchHomeOption()
    }, [homeId])

    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [selectedSensor, setSelectedSensor] = useState(null)
    const [selectedCondition, setSelectedCondition] = useState(null)
    const [editMode, setEditMode] = useState({
        temperatureHigh: false,
        temperatureLow: false,
        humidityHigh: false,
        humidityLow: false,
        lightHigh: false,
        lightLow: false
    })
    const [controlType, setControlType] = useState('threshold') // New state for control type
    const [schedule, setSchedule] = useState({
        temperature: { fromTime: '', toTime: '', dateOption: 'today', specificDates: [], devices: [] },
        humidity: { fromTime: '', toTime: '', dateOption: 'today', specificDates: [], devices: [] },
        light: { fromTime: '', toTime: '', dateOption: 'today', specificDates: [], devices: [] }
    })

    const toggleEditMode = (sensor, condition) => {
        setEditMode((prev) => ({
            ...prev,
            [`${sensor}${condition}`]: !prev[`${sensor}${condition}`]
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        const [sensor, type] = name.split('.')
        setSettings((prev) => ({
            ...prev,
            [sensor]: { ...prev[sensor], [type]: value }
        }))
    }

    const handleScheduleChange = (e) => {
        const { name, value } = e.target
        const [sensor, type] = name.split('.')
        setSchedule((prev) => ({
            ...prev,
            [sensor]: { ...prev[sensor], [type]: value }
        }))
    }

    const handleSpecificDatesChange = (sensor, e) => {
        const dates = Array.from(e.target.selectedOptions, (option) => option.value)
        setSchedule((prev) => ({
            ...prev,
            [sensor]: { ...prev[sensor], specificDates: dates }
        }))
    }

    const handleSpecificDateChange = (sensor, e) => {
        const date = e.target.value
        setSchedule((prev) => ({
            ...prev,
            [sensor]: { ...prev[sensor], specificDates: [date] }
        }))
    }

    const handleDeviceChange = (sensor, condition, deviceId, field, value) => {
        setSettings((prev) => ({
            ...prev,
            [sensor]: {
                ...prev[sensor],
                [`${condition}Devices`]: prev[sensor][`${condition}Devices`].map((device) =>
                    device.id === deviceId ? { ...device, [field]: value } : device
                )
            }
        }))
    }

    const handleAddDevice = (sensor, condition, deviceId) => {
        const deviceExists = settings[sensor][`${condition}Devices`].some((device) => device.id === deviceId)
        if (!deviceExists) {
            const deviceInfo = devices.find((d) => d.id === deviceId)
            setSettings((prev) => ({
                ...prev,
                [sensor]: {
                    ...prev[sensor],
                    [`${condition}Devices`]: [
                        ...prev[sensor][`${condition}Devices`],
                        { id: deviceId, name: deviceInfo.name, enabled: true, action: 'ON' }
                    ]
                }
            }))
        }
        setDropdownVisible(false)
    }

    const handleAddScheduleDevice = (sensor, deviceId) => {
        const deviceExists = schedule[sensor].devices.some((device) => device.id === deviceId)
        if (!deviceExists) {
            const deviceInfo = devices.find((d) => d.id === deviceId)
            setSchedule((prev) => ({
                ...prev,
                [sensor]: {
                    ...prev[sensor],
                    devices: [
                        ...prev[sensor].devices,
                        { id: deviceId, name: deviceInfo.name, enabled: true, action: 'ON' }
                    ]
                }
            }))
        }
        setDropdownVisible(false)
    }

    const handleRemoveDevice = (sensor, condition, deviceId) => {
        setSettings((prev) => ({
            ...prev,
            [sensor]: {
                ...prev[sensor],
                [`${condition}Devices`]: prev[sensor][`${condition}Devices`].filter((device) => device.id !== deviceId)
            }
        }))
    }

    const iconMap = {
        Heater: Heater,
        Tv: Tv,
        Refrigerator: Refrigerator,
        SquarePower: SquarePower,
        Lightbulb: Lightbulb,
        Bolt: Bolt,
        DoorClosed: DoorClosed
    }

    const DeviceControls = ({ sensor, condition, isSchedule }) => (
        <div className='mt-2'>
            <div className='flex justify-between items-center'>
                <Label className='block text-sm font-medium text-gray-200'>
                    Devices to Control {isSchedule ? '' : `(${condition})`}
                </Label>
                <div className='relative'>
                    <div className='flex justify-around gap-1'>
                        <Button
                            onClick={() => toggleEditMode(sensor, condition)}
                            variant={editMode[`${sensor}${condition}`] ? 'default' : 'secondary'}
                            className='hover:scale-105 transition-transform h-8 w-8 p-0 text-sm'
                        >
                            <TiEdit />
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedSensor(sensor)
                                setSelectedCondition(condition)
                                setDropdownVisible(!dropdownVisible)
                            }}
                            className='hover:scale-105 transition-transform h-8 w-8 p-0 text-sm'
                        >
                            <GoPlus />
                        </Button>
                    </div>
                    {dropdownVisible && selectedSensor === sensor && selectedCondition === condition && (
                        <div className='absolute right-0 mt-2 w-40 border border-gray-600 rounded-md shadow-lg z-10'>
                            {devices.map((device) => {
                                const DeviceIcon = iconMap[device.icon]
                                return (
                                    <Button
                                        key={device.id}
                                        onClick={() =>
                                            isSchedule
                                                ? handleAddScheduleDevice(sensor, device.id)
                                                : handleAddDevice(sensor, condition, device.id)
                                        }
                                        className='flex items-center justify-between w-full text-left text-white bg-gray-800 hover:text-black transition-colors'
                                    >
                                        {DeviceIcon && <DeviceIcon className='mr-2' size={16} />}
                                        {device.name}
                                    </Button>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className='mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3 items-center'>
                {(isSchedule ? schedule[sensor].devices : settings[sensor][`${condition}Devices`]).map((device) => {
                    const deviceInfo = devices.find((d) => d.id === device.id)
                    if (!deviceInfo) return null // Add this check
                    const DeviceIcon = iconMap[deviceInfo.icon]
                    return (
                        <div
                            key={device.id}
                            className='flex justify-between items-center bg-[#12171b] rounded-lg p-1 shadow-lg'
                        >
                            <div className='flex items-center justify-around ml-1'>
                                {DeviceIcon && <DeviceIcon className='mr-1 text-gray-500' />}
                                <span className='ml-2 text-gray-400'>{deviceInfo.name}</span>
                                <Button
                                    onClick={() => handleRemoveDevice(sensor, condition, device.id)}
                                    className={`bg-red-600 text-white rounded-full ml-3 transform transition-opacity duration-300 h-6 w-6 p-0 text-xs flex items-center justify-center ${
                                        editMode[`${sensor}${condition}`]
                                            ? 'opacity-100 visible'
                                            : 'opacity-0 invisible'
                                    }`}
                                >
                                    <FaMinus />
                                </Button>
                            </div>
                            <div>
                                <Select
                                    onValueChange={(val) =>
                                        handleDeviceChange(sensor, condition, device.id, 'action', val)
                                    }
                                    defaultValue={device.action}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='ON'>Turn On</SelectItem>
                                        <SelectItem value='OFF'>Turn Off</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

    const handleControlTypeChange = (e) => {
        setControlType(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const formattedSettings = {
                controlType,
                temperature: {
                    high: settings.temperature.high !== '' ? parseFloat(settings.temperature.high) : null,
                    low: settings.temperature.low !== '' ? parseFloat(settings.temperature.low) : null,
                    highDevices: settings.temperature.highDevices,
                    lowDevices: settings.temperature.lowDevices
                },
                humidity: {
                    high: settings.humidity.high !== '' ? parseFloat(settings.humidity.high) : null,
                    low: settings.humidity.low !== '' ? parseFloat(settings.humidity.low) : null,
                    highDevices: settings.humidity.highDevices,
                    lowDevices: settings.humidity.lowDevices
                },
                light: {
                    high: settings.light.high !== '' ? parseFloat(settings.light.high) : null,
                    low: settings.light.low !== '' ? parseFloat(settings.light.low) : null,
                    highDevices: settings.light.highDevices,
                    lowDevices: settings.light.lowDevices
                }
            }
            const response = await applyHomeOption(homeId, formattedSettings)
            console.log('Settings applied:', response.data)
            toast('Settings have been saved', {
                description: 'Your device settings have been successfully updated.',
                action: {
                    label: 'Undo',
                    onClick: () => console.log('Undo')
                }
            })
            onClose()
        } catch (error) {
            console.error('Error saving settings:', error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='gap-1 bg-slate-600 text-white hover:bg-slate-500 transition-transform'>
                    <Settings size={20} />
                    <p className='hidden sm:flex'>Setting</p>
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[1200px] bg-[#18191f] overflow-y-auto max-h-[90vh] rounded-lg shadow-xl p-10 transition-all duration-300 hover:shadow-2xl'>
                <DialogHeader>
                    <div className='flex items-center gap-3 justify-between'>
                        <div className=''>
                            <DialogTitle className='flex items-center gap-3 text-left mb-2'>
                                <Settings size={20} />
                                Setting
                            </DialogTitle>
                            <DialogDescription className='text-left'>
                                Make change about your Device here. Click save when you're done.
                            </DialogDescription>
                        </div>
                        <div>
                            <Select value={controlType} onValueChange={(val) => setControlType(val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='threshold'>Threshold</SelectItem>
                                    <SelectItem value='schedule'>Schedule</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    {controlType === 'schedule' && (
                        <div className='mb-6 bg-[#272a30] rounded-lg p-4 shadow-lg transition-transform hover:scale-[1.01]'>
                            <h3 className='text-xl font-semibold capitalize mb-2 text-white'>Schedule</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <Label className='block text-sm font-medium text-gray-400'>From Time</Label>
                                    <Input
                                        type='time'
                                        name='temperature.fromTime'
                                        value={schedule.temperature.fromTime}
                                        onChange={handleScheduleChange}
                                    />
                                </div>
                                <div>
                                    <Label className='block text-sm font-medium text-gray-400'>To Time</Label>
                                    <Input
                                        type='time'
                                        name='temperature.toTime'
                                        value={schedule.temperature.toTime}
                                        onChange={handleScheduleChange}
                                    />
                                </div>
                                <div>
                                    <Label className='block text-sm font-medium text-gray-400'>Date Option</Label>
                                    <Select
                                        name='temperature.dateOption'
                                        value={schedule.temperature.dateOption}
                                        onValueChange={(val) =>
                                            setSchedule((prev) => ({
                                                ...prev,
                                                temperature: { ...prev.temperature, dateOption: val }
                                            }))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='today'>Today</SelectItem>
                                            <SelectItem value='everyday'>Everyday</SelectItem>
                                            <SelectItem value='specific'>Specific Date</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {schedule.temperature.dateOption === 'specific' && (
                                    <div>
                                        <Label className='block text-sm font-medium text-gray-400'>Specific Date</Label>
                                        <Input
                                            type='date'
                                            name='temperature.specificDate'
                                            onChange={(e) => handleSpecificDateChange('temperature', e)}
                                        />
                                    </div>
                                )}
                            </div>
                            <DeviceControls sensor='temperature' condition='devices' isSchedule={true} />
                        </div>
                    )}
                    {controlType === 'threshold' && (
                        <>
                            <div className='mb-6 bg-[#272a30] rounded-lg p-2 shadow-lg'>
                                <h3 className='text-xl font-semibold capitalize mb-2 text-white'>Temperature</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <Label className='block text-sm font-medium text-gray-400'>
                                            High Threshold
                                        </Label>
                                        <Input
                                            type='number'
                                            name='temperature.high'
                                            value={settings.temperature.high}
                                            onChange={handleChange}
                                            placeholder='℃'
                                        />
                                        <DeviceControls sensor='temperature' condition='high' />
                                    </div>
                                    <div>
                                        <Label className='block text-sm font-medium text-gray-400'>Low Threshold</Label>
                                        <Input
                                            type='number'
                                            name='temperature.low'
                                            value={settings.temperature.low}
                                            onChange={handleChange}
                                            placeholder='℃'
                                        />
                                        <DeviceControls sensor='temperature' condition='low' />
                                    </div>
                                </div>
                            </div>
                            <div className='mb-6 bg-[#272a30] rounded-lg p-2 shadow-lg'>
                                <h3 className='text-xl font-semibold capitalize mb-2 text-white'>Humidity</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <Label className='block text-sm font-medium text-gray-400'>
                                            High Threshold
                                        </Label>
                                        <Input
                                            type='number'
                                            name='humidity.high'
                                            value={settings.humidity.high}
                                            onChange={handleChange}
                                            placeholder='%'
                                        />
                                        <DeviceControls sensor='humidity' condition='high' />
                                    </div>
                                    <div>
                                        <Label className='block text-sm font-medium text-gray-400'>Low Threshold</Label>
                                        <Input
                                            type='number'
                                            name='humidity.low'
                                            value={settings.humidity.low}
                                            onChange={handleChange}
                                            placeholder='%'
                                        />
                                        <DeviceControls sensor='humidity' condition='low' />
                                    </div>
                                </div>
                            </div>
                            <div className='mb-6 bg-[#272a30] rounded-lg p-2 shadow-lg'>
                                <h3 className='text-xl font-semibold capitalize mb-2 text-white'>Light</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <Label className='block text-sm font-medium text-gray-400'>
                                            High Threshold
                                        </Label>
                                        <Input
                                            type='number'
                                            name='light.high'
                                            value={settings.light.high}
                                            onChange={handleChange}
                                            placeholder='Lux'
                                        />
                                        <DeviceControls sensor='light' condition='high' />
                                    </div>
                                    <div>
                                        <Label className='block text-sm font-medium text-gray-400'>Low Threshold</Label>
                                        <Input
                                            type='number'
                                            name='light.low'
                                            value={settings.light.low}
                                            onChange={handleChange}
                                            placeholder='Lux'
                                        />
                                        <DeviceControls sensor='light' condition='low' />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <DialogFooter className='flex gap-2'>
                        <DialogClose asChild>
                            <Button type='button' variant='secondary' className=''>
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                type='submit'
                                className='bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transition-colors'
                            >
                                Save
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DeviceSettingDialog
