import React, { useState } from 'react';
import axios from 'axios';
import createDevice from '../apis/Devices/CreateDevice';

const DeviceModal = ({ isVisible, onClose, addDevice, homePodId }) => {
    const [deviceData, setDeviceData] = useState({
        name: '',
        icon: '',
        description: '',
        status: 0
    });
    const [alertVisible, setAlertVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeviceData({ ...deviceData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, icon, description } = deviceData;
        if (!name || !icon || !description) {
            setAlertVisible(true);
            return;
        }

        try {
            const createdDevice = await createDevice(homePodId, deviceData);
            addDevice(createdDevice.data);
            setDeviceData({ name: '', icon: '', description: '', status: 0 }); // Reset form data
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!isVisible) return null;

    return (
        <div>
            {/* <!-- Main modal --> */}
            <div tabIndex="-1" aria-hidden={!isVisible} className=" overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relativ rounded-lg shadow dark:bg-gray-900">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-white">
                                Create New Device
                            </h3>
                            <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                            {alertVisible && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                    <strong className="font-bold">Error!</strong>
                                    <span className="block sm:inline"> Please fill in all fields.</span>
                                    <span onClick={() => setAlertVisible(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414L8.828 10l-3.176 3.176a1 1 0 101.414 1.414L10 12.828l2.934 2.934a1 1 0 001.414-1.414L11.172 10l3.176-3.176z"/></svg>
                                    </span>
                                </div>
                            )}
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-mediumtext-white">Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type device name" required="" value={deviceData.name} onChange={handleChange} />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-white">Category</label>
                                    <select id="category" name="icon" className="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={deviceData.icon} onChange={handleChange}>
                                        <option selected="">Select Device Type</option>
                                        <option value="CgSmartHomeRefrigerator">Refrigerator</option>
                                        <option value="MdOutlineSensorDoor">Door</option>
                                        <option value="PiLightbulbFilament">Lightbulb</option>
                                        <option value="ImSwitch">Switch</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Device Description</label>
                                    <textarea id="description" name="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write device description here" value={deviceData.description} onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add New Device
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeviceModal;