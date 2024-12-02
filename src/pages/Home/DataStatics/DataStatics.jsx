import React, { useEffect, useRef, useState, useMemo } from 'react'
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const DataStatics = () => {
    const [selectedData, setSelectedData] = useState('Temp');
    const [selectedDayRange, setSelectedDayRange] = useState('Last 7 days');

    const dataOptions = {
        Temp: {
            'Yesterday': Array.from({ length: 8 }, (_, i) => 29 + i % 2),
            'Today': Array.from({ length: 7 }, (_, i) => 30 + i % 2),
            'Last 7 days': [30, 32, 31, 29, 28, 27, 26]
        },
        Humi: {
            'Yesterday': Array.from({ length: 8 }, (_, i) => 65 + i % 5),
            'Today': Array.from({ length: 8 }, (_, i) => 70 + i % 5),
            'Last 7 days': [70, 65, 75, 80, 60, 55, 50]
        },
        Light: {
            'Yesterday': Array.from({ length: 8 }, (_, i) => 350 + i * 10),
            'Today': Array.from({ length: 8 }, (_, i) => 300 + i * 10),
            'Last 7 days': [300, 350, 400, 450, 500, 550, 600]
        }
    };
    console.log(dataOptions);
    const options = useMemo(() => ({
        xaxis: {
            show: true,
            categories: selectedDayRange === 'Yesterday' || selectedDayRange === 'Today' ? Array.from({ length: 8 }, (_, i) => `${i * 3}:00`) : ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
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
    }), [selectedData, selectedDayRange]);

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
        if (chartRef.current && typeof ApexCharts !== "undefined") {
            const chart = new ApexCharts(chartRef.current, options)
            chart.render()

            return () => {
                chart.destroy()
            }
        }
    }, [options])

    return (
        <div>
            <div className="w-full rounded-xl shadow bg-gradient-to-r from-[#1d1e1f] to-[#0f171f] p-4 md:p-6 relative">
                <div className="flex justify-between">
                    <div>
                        <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">Feeling Great</h5>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Data timeline</p>
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