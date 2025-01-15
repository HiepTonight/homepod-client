import React, { useEffect, useRef, useState, useMemo } from 'react'
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import getYesterdaySensorData from '../../../apis/SensorData/GetYesterdaySensorData';
import getTodaySensorData from '../../../apis/SensorData/GetTodaySensorData';
import get7daySensorData from '../../../apis/SensorData/Get7daySensorData';
import { Skeleton } from '@/components/ui/skeleton'

const DataStatics = ({ homePodId }) => {
    const [selectedData, setSelectedData] = useState('Temp');
    const [selectedDayRange, setSelectedDayRange] = useState('Today'); // Set default to 'Today'
    const [apiData, setApiData] = useState([]); // Add state for API data
    const [loading, setLoading] = useState(true);

    const dataOptions = useMemo(() => ({
        Temp: {
            'Yesterday': apiData.map(item => item.temp),
            'Today': apiData.map(item => item.temp),
            'Last 7 days': apiData.map(item => item.temp)
        },
        Humi: {
            'Yesterday': apiData.map(item => item.humi),
            'Today': apiData.map(item => item.humi),
            'Last 7 days': apiData.map(item => item.humi)
        },
        Light: {
            'Yesterday': apiData.map(item => item.light),
            'Today': apiData.map(item => item.light),
            'Last 7 days': apiData.map(item => item.light)
        }
    }), [apiData]);

    const options = useMemo(() => ({
        xaxis: {
            show: true,
            categories: selectedDayRange === 'Last 7 days' ? apiData.map(item => new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })) : apiData.map(item => new Date(item.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })), // Use API data for x-axis labels
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                }
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: true,
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                },
                formatter: function (value) {
                    return '' + value;
                }
            }
        },
        series: [
            {
                name: selectedData,
                data: dataOptions[selectedData][selectedDayRange],
                color: "#1A56DB",
            },
        ],
        chart: {
            sparkline: {
                enabled: false
            },
            height: "100%",
            width: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: "#1C64F2",
                gradientToColors: ["#1C64F2"],
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 6,
        },
        legend: {
            show: false
        },
        grid: {
            show: false,
        },
    }), [selectedData, selectedDayRange, apiData]);

    const chartRef = useRef(null)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [secondDropdownOpen, setSecondDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSecondDropdown = () => {
        setSecondDropdownOpen(!secondDropdownOpen);
    };

    const handleOptionClick = (option) => {
        console.log(`Selected option: ${option}`);
        setSelectedDayRange(option);
        setDropdownOpen(false);
    };

    const handleSecondOptionClick = (option) => {
        console.log(`Selected option: ${option}`);
        setSelectedData(option);
        setSecondDropdownOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (selectedDayRange === 'Yesterday') {
                    response = await getYesterdaySensorData(homePodId);
                } else if (selectedDayRange === 'Today') {
                    response = await getTodaySensorData(homePodId);
                } else if (selectedDayRange === 'Last 7 days') {
                    response = await get7daySensorData(homePodId);
                }
                if (response.success) {
                    setApiData(response.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedDayRange, homePodId]);

    useEffect(() => {
        if (chartRef.current && typeof ApexCharts !== "undefined") {
            const chart = new ApexCharts(chartRef.current, options)
            chart.render()

            return () => {
                chart.destroy()
            }
        }
    }, [options])

    const getTimelineText = () => {
        switch (selectedData) {
            case 'Temp':
                return 'Temperature Data Timeline';
            case 'Humi':
                return 'Humidity Data Timeline';
            case 'Light':
                return 'Light Data Timeline';
            default:
                return 'Data Timeline';
        }
    };

    if (loading) {
        return (
            <div className="w-full rounded-xl shadow bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-900 p-4 md:p-6 relative animate-pulse">
                <div className="flex justify-between">
                    <div>
                        <h5 className="leading-none text-3xl font-bold text-gray-600 dark:text-white pb-2">Data Chart</h5>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Loading...</p>
                    </div>
                </div>
                <Skeleton className="h-32 bg-gray-700 rounded mt-4"/>
                <Skeleton className="h-10 bg-gray-700 rounded mt-4"/>
            </div>
        );
    }

    return (
        <div>
            <div className="w-full rounded-xl shadow bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-900 p-4 md:p-6 relative max-h-full">
                <div className="flex justify-between">
                    <div>
                        <h5 className="leading-none text-3xl font-bold text-gray-600 dark:text-white pb-2">Data Chart</h5>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">{getTimelineText()}</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="relative">
                            <button
                                id="dropdownDefaultButton"
                                onClick={toggleDropdown}
                                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                                type="button">
                                {selectedDayRange}
                                <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div id="lastDaysdropdown" className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                        <li>
                                            <a href="#" onClick={() => handleOptionClick('Yesterday')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={() => handleOptionClick('Today')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={() => handleOptionClick('Last 7 days')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="relative ml-4">
                            <button
                                id="secondDropdownButton"
                                onClick={toggleSecondDropdown}
                                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                                type="button">
                                {selectedData}
                                <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            {secondDropdownOpen && (
                                <div id="secondDropdown" className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="secondDropdownButton">
                                        <li>
                                            <a href="#" onClick={() => handleSecondOptionClick('Temp')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Temp</a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={() => handleSecondOptionClick('Humi')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Humi</a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={() => handleSecondOptionClick('Light')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Light</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div ref={chartRef} id="data-series-chart"></div>
            </div>
        </div>
    )
}

export default DataStatics