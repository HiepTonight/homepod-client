import React, { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Ellipsis, Inbox } from 'lucide-react'
import { waitFor } from '@/lib/waitFor'

const RecentActivities = () => {
    const [isLoading, setIsLoading] = useState(true) // Add loading state
    const [activities, setActivities] = useState([])

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                // Simulate fetching data
                // await new Promise((resolve) => setTimeout(resolve, 1000))
                // const data = [
                //     { id: 1, description: 'Light turned on in Living Room', timestamp: '10:30 AM' },
                //     { id: 2, description: 'Temperature set to 22°C in Bedroom', timestamp: '9:45 AM' },
                //     { id: 3, description: 'Humidity level adjusted in Kitchen', timestamp: '8:15 AM' }
                // ]
                // setActivities(data)
                await waitFor(500)
            } catch (error) {
                console.error('Error fetching activities:', error)
            } finally {
                setIsLoading(false) // Set loading to false after fetching
            }
        }

        fetchActivities()
    }, [])

    return (
        <div className='h-full p-4 rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1b1c1d] darKto-[#111b24]'>
            <div className='mb-2 flex justify-between items-center'>
                <Label className='text-base font-medium text-gray-700 dark:text-white'>Recent Activities</Label>
                <Label className='font-normal cursor-pointer text-gray-500 dark:text-gray-400'>View all</Label>
            </div>
            <ul className='space-y-2'>
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className='flex flex-col gap-2  rounded-lg shadow-lg p-4 sm:p-5'>
                            <div className='flex justify-between items-center'>
                                <div className='w-full'>
                                    <Skeleton className='h-[14px] w-1/2 bg-gray-500' />
                                </div>
                                <Ellipsis size={20} />
                            </div>
                        </div>
                    ))
                ) : activities.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-full p-6'>
                        <div className='rounded-full bg-gray-200 dark:bg-gray-700 w-20 h-20 flex items-center justify-center mb-4'>
                            <Inbox size={40} className='text-gray-500 dark:text-gray-400' />
                        </div>
                        <p className='font-bold text-gray-600 dark:text-gray-300'>No activities</p>
                        <p className='text-sm text-gray-500 dark:text-gray-400 text-center mt-2'>
                            You're all caught up! We'll notify you when there's something new.
                        </p>
                    </div>
                ) : (
                    activities.map((activity) => (
                        <li
                            key={activity.id}
                            className='text-gray-500 dark:text-gray-300 flex justify-between items-center hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors duration-300 p-2 rounded-md'
                        >
                            <div>
                                <Label>{activity.description}</Label>
                                <div className='text-sm text-gray-500'>{activity.timestamp}</div>
                            </div>
                            <div className='hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors duration-300 p-1 rounded-md'>
                                <Ellipsis size={20} />
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}

export default RecentActivities
