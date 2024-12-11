import React, { useState } from 'react';
import axios from 'axios';
import { GoPlus } from "react-icons/go";
import { TiEdit } from "react-icons/ti";
import { FaMinus } from "react-icons/fa6";

const SensorSettingsModal = ({ isVisible, onClose, devices }) => {
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
    });

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState(null);
    const [selectedCondition, setSelectedCondition] = useState(null);
    const [editMode, setEditMode] = useState({
        temperatureHigh: false,
        temperatureLow: false,
        humidityHigh: false,
        humidityLow: false,
        lightHigh: false,
        lightLow: false
    });

    const toggleEditMode = (sensor, condition) => {
        setEditMode(prev => ({
            ...prev,
            [`${sensor}${condition}`]: !prev[`${sensor}${condition}`]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [sensor, type] = name.split('.');
        setSettings(prev => ({
            ...prev,
            [sensor]: { ...prev[sensor], [type]: value }
        }));
    };

    const handleDeviceChange = (sensor, condition, deviceId, field, value) => {
        setSettings(prev => ({
            ...prev,
            [sensor]: {
                ...prev[sensor],
                [`${condition}Devices`]: prev[sensor][`${condition}Devices`].map(device =>
                    device.id === deviceId ? { ...device, [field]: value } : device
                )
            }
        }));
    };

    const handleAddDevice = (sensor, condition, deviceId) => {
        const deviceExists = settings[sensor][`${condition}Devices`].some(device => device.id === deviceId);
        if (!deviceExists) {
            const deviceInfo = devices.find(d => d.id === deviceId);
            setSettings(prev => ({
                ...prev,
                [sensor]: {
                    ...prev[sensor],
                    [`${condition}Devices`]: [
                        ...prev[sensor][`${condition}Devices`],
                        { id: deviceId, name: deviceInfo.name, enabled: true, action: 'ON' }
                    ]
                }
            }));
        }
        setDropdownVisible(false);
    };

    const handleRemoveDevice = (sensor, condition, deviceId) => {
        setSettings(prev => ({
            ...prev,
            [sensor]: {
                ...prev[sensor],
                [`${condition}Devices`]: prev[sensor][`${condition}Devices`].filter(device => device.id !== deviceId)
            }
        }));
    };

    const DeviceControls = ({ sensor, condition }) => (
        <div className="mt-2">
            <div className='flex justify-between items-center'>
                <label className="block text-sm font-medium text-gray-200">
                    Devices to Control ({condition})
                </label>
                <div className="relative">
                    <div className='flex justify-around gap-1'>
                        <button onClick={() => toggleEditMode(sensor, condition)} className={`bg-gray-500 text-gray-200 rounded-md p-1 transition-all duration-300 ${editMode[`${sensor}${condition}`] ? 'bg-blue-600 text-white' : 'text-gray-400 bg-gray-700'}`}>
                            <TiEdit />
                        </button>
                        <button
                            className='bg-blue-500 rounded-md p-1'
                            onClick={() => {
                                setSelectedSensor(sensor);
                                setSelectedCondition(condition);
                                setDropdownVisible(!dropdownVisible);
                            }}
                        >
                            <GoPlus />
                        </button>
                    </div>
                    {dropdownVisible && selectedSensor === sensor && selectedCondition === condition && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-gray-300 rounded-md shadow-lg z-10">
                            {devices.map(device => (
                                <button
                                    key={device.id}
                                    onClick={() => handleAddDevice(sensor, condition, device.id)}
                                    className="flex items-center w-full text-left px-4 py-2 text-white hover:bg-gray-400"
                                >
                                    <device.icon className="mr-2" />
                                    {device.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3 items-center">
                {settings[sensor][`${condition}Devices`].map(device => {
                    const deviceInfo = devices.find(d => d.id === device.id);
                    const DeviceIcon = deviceInfo ? deviceInfo.icon : null;
                    return (
                        <div key={device.id} className="flex justify-between items-center bg-[#12171b] rounded-lg p-1 shadow-lg">
                            <div className='flex items-center justify-around ml-1'>
                                {DeviceIcon && <DeviceIcon className="mr-1 text-gray-500" />}
                                <span className="ml-2 text-gray-400">{deviceInfo.name}</span>
                                <button
                                    onClick={() => handleRemoveDevice(sensor, condition, device.id)}
                                    className={`bg-red-600 text-gray-800 rounded-full ml-3 transform transition-opacity duration-300 ${editMode[`${sensor}${condition}`] ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                                >
                                    <FaMinus />
                                </button>
                            </div>
                            <select
                                value={device.action}
                                onChange={(e) => handleDeviceChange(sensor, condition, device.id, 'action', e.target.value)}
                                className="text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="ON">Turn On</option>
                                <option value="OFF">Turn Off</option>
                            </select>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formattedSettings = {
                temperature: {
                    ...settings.temperature,
                    high: parseFloat(settings.temperature.high),
                    low: parseFloat(settings.temperature.low),
                    highDevices: settings.temperature.highDevices.map(device => ({
                        id: device.id,
                        name: device.name,
                        enabled: device.enabled,
                        action: device.action
                    })),
                    lowDevices: settings.temperature.lowDevices.map(device => ({
                        id: device.id,
                        name: device.name,
                        enabled: device.enabled,
                        action: device.action
                    }))
                },
                humidity: {
                    ...settings.humidity,
                    high: parseFloat(settings.humidity.high),
                    low: parseFloat(settings.humidity.low),
                    highDevices: settings.humidity.highDevices.map(device => ({
                        id: device.id,
                        name: device.name,
                        enabled: device.enabled,
                        action: device.action
                    })),
                    lowDevices: settings.humidity.lowDevices.map(device => ({
                        id: device.id,
                        name: device.name,
                        enabled: device.enabled,
                        action: device.action
                    }))
                },
                light: {
                    ...settings.light,
                    high: parseFloat(settings.light.high),
                    low: parseFloat(settings.light.low),
                    highDevices: settings.light.highDevices.map(device => ({
                        id: device.id,
                        name: device.name,
                        enabled: device.enabled,
                        action: device.action
                    })),
                    lowDevices: settings.light.lowDevices.map(device => ({
                        id: device.id,
                        name: device.name,
                        enabled: device.enabled,
                        action: device.action
                    }))
                }
            };
            // await axios.post('/api/sensor/settings', formattedSettings);
            console.log('Settings saved:', formattedSettings);
            onClose();
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-[#1b1c1d] rounded-lg shadow-lg p-6 w-full max-w-7xl transform transition-all duration-300 ease-in-out">
                <h2 className="text-2xl font-bold mb-4 text-center text-white">Sensor Settings</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 bg-[#272a30] rounded-lg p-2 shadow-lg">
                        <h3 className="text-xl font-semibold capitalize mb-2 text-white">Temperature</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400">High Threshold</label>
                                <input
                                    type="number"
                                    name="temperature.high"
                                    value={settings.temperature.high}
                                    onChange={handleChange}
                                    placeholder='℃'
                                    className="bg-[#1b1c1d] mt-1 block w-full p-2 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
                                />
                                <DeviceControls
                                    sensor="temperature"
                                    condition="high"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Low Threshold</label>
                                <input
                                    type="number"
                                    name="temperature.low"
                                    value={settings.temperature.low}
                                    onChange={handleChange}
                                    placeholder='℃'
                                    className="bg-[#1b1c1d] mt-1 block w-full p-2 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
                                />
                                <DeviceControls
                                    sensor="temperature"
                                    condition="low"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 bg-[#272a30] rounded-lg p-2 shadow-lg">
                        <h3 className="text-xl font-semibold capitalize mb-2 text-white">Humidity</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400">High Threshold</label>
                                <input
                                    type="number"
                                    name="humidity.high"
                                    value={settings.humidity.high}
                                    onChange={handleChange}
                                    placeholder='%'
                                    className="bg-[#1b1c1d] mt-1 block w-full p-2 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
                                />
                                <DeviceControls
                                    sensor="humidity"
                                    condition="high"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Low Threshold</label>
                                <input
                                    type="number"
                                    name="humidity.low"
                                    value={settings.humidity.low}
                                    onChange={handleChange}
                                    placeholder='%'
                                    className="bg-[#1b1c1d] mt-1 block w-full p-2 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
                                />
                                <DeviceControls
                                    sensor="humidity"
                                    condition="low"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 bg-[#272a30] rounded-lg p-2 shadow-lg">
                        <h3 className="text-xl font-semibold capitalize mb-2 text-white">Light</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400">High Threshold</label>
                                <input
                                    type="number"
                                    name="light.high"
                                    value={settings.light.high}
                                    onChange={handleChange}
                                    placeholder='Lux'
                                    className="bg-[#1b1c1d] mt-1 block w-full p-2 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
                                />
                                <DeviceControls
                                    sensor="light"
                                    condition="high"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Low Threshold</label>
                                <input
                                    type="number"
                                    name="light.low"
                                    value={settings.light.low}
                                    onChange={handleChange}
                                    placeholder='Lux'
                                    className="bg-[#1b1c1d] mt-1 block w-full p-2 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
                                />
                                <DeviceControls
                                    sensor="light"
                                    condition="low"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SensorSettingsModal;