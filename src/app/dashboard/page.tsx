import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeCard from '../../pages/Home/HomeCard'
import { GoPlus } from 'react-icons/go'
import { TiEdit } from 'react-icons/ti'
import { MdOutlineAddHome } from 'react-icons/md'
import { PowerChart } from '@/components/power-chart'
import { HomeCreateButton } from '@/components/home-create-button'
import NewHomeModal from '../../components/NewHomeModal'
import { Button } from '@/components/ui/button'
import { getUserHomes } from '@/apis/Homes/HomeService'
import RecentActivities from '@/components/recent-activities'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { InboxIcon, LampDesk  } from 'lucide-react'

interface HomeProps {
    onHomeNameChange: (name: string) => void
}

const Homes = () => {
    const [homes, setHomes] = useState([])
    const [isLoading, setIsLoading] = useState(true) // Add loading state
    const [isEditMode, setIsEditMode] = useState(false)
    const [isXL, setIsXL] = useState(window.innerWidth >= 1280) // Add state for screen size
    const navigate = useNavigate()

    useEffect(() => {
        const fetchHomes = async () => {
            try {
                const data = await getUserHomes()
                // console.log('data', data)
                setHomes(data || [])
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching homes:', error)
            } finally {
                // Set loading to false after fetching
            }
        }

        fetchHomes()

        const handleResize = () => {
            setIsXL(window.innerWidth >= 1280)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleHomeClick = (homeId) => {
        navigate(`/home/${homeId}`)
    }

    const removeHome = (homeId) => {
        setHomes(homes.filter((home) => home.id !== homeId))
    }

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode)
    }

    const addHome = (newHome) => {
        setHomes([...homes, newHome])
    }

    return (
        <div className='p-4 flex flex-col lg:grid lg:grid-cols-3 gap-4 h-full'>
            <div className=' justify-around gap-4  p-5 rounded-lg shadow-lg col-span-2 bg-gradient-to-br from-gray-200 to-gray-300 dark:bg-gradient-to-r dark:from-[#1b2a55] dark:to-[#081d41]'>
                <div className='flex justify-between items-center pb-2'>
                    <h1 className='text-sm sm:text-xl font-medium text-gray-600 dark:text-white items-center'>
                        Your sweet homes!
                    </h1>
                    <div className='flex gap-2'>
                        <Button
                            size='sm'
                            className={` transition-colors duration-300 text-white ${isEditMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-400 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                            onClick={toggleEditMode}
                        >
                            <TiEdit />
                            <p className='hidden sm:flex'>Edit</p>
                        </Button>
                        <HomeCreateButton addHome={addHome} title={'Add Home'} />
                    </div>
                </div>
                {isLoading ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mt-2'>
                        {Array.from({ length: isXL ? 9 : 6 }).map((_, index) => (
                            <Card key={index} className='w-full'>
                                <CardHeader className='pb-2'>
                                    <div className='flex justify-between items-center'>
                                        <Skeleton className='h-6 w-3/4' />
                                        <Skeleton className='h-8 w-8 rounded-full' />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className='h-4 w-full mb-2' />
                                    <Skeleton className='h-4 w-5/6 mb-4' />
                                    <div className='flex justify-between'>
                                        <Skeleton className='h-6 w-20' />
                                        <Skeleton className='h-6 w-16' />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : homes.length === 0 ? (
                    <div className='flex flex-col gap-4 items-center justify-center mt-44'>
                        <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
                            <InboxIcon size={40} className='stroke-primary' />
                        </div>
                        <div className='flex flex-col gap-1 text-center'>
                            <p className='font-bold text-gray-600'>No homes created yet!</p>
                            <p className='text-sm text-muted-foreground'>
                                Click the button below to create your first home
                            </p>
                        </div>
                        <HomeCreateButton addHome={addHome} title={'Create your first home'} />
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mt-2'>
                        {homes.map((home) => (
                            <HomeCard
                                key={home.id}
                                home={home}
                                removeHome={removeHome}
                                isEditMode={isEditMode}
                                // onClick={() => handleHomeClick(home.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className='col-span-1 flex flex-col gap-4'>
                <RecentActivities />
                <PowerChart />
            </div>
        </div>
    )
}

export default Homes
