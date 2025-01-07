import { useEffect, useState } from 'react'
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
            <div className=' justify-around gap-4  p-5 rounded-lg shadow-lg col-span-2 bg-gradient-to-r from-[#1b2a55] to-[#081d41]'>
                <div className='flex justify-between items-center pb-2'>
                    <h1 className='text-sm sm:text-xl font-medium text-white items-center'>Your sweet homes!</h1>
                    <div className='flex gap-2'>
                        <Button
                            className={` transition-colors duration-300 ${isEditMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'text-gray-400 bg-gray-700 hover:bg-gray-600'}`}
                            onClick={toggleEditMode}
                        >
                            <TiEdit />
                            <p className='hidden sm:flex'>Edit</p>
                        </Button>
                        <HomeCreateButton addHome={addHome} />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mt-2'>
                    {isLoading
                        ? Array.from({ length: isXL ? 9 : 3 }).map((_, index) => (
                              <div
                                  key={index}
                                  className='flex flex-col gap-2 bg-slate-900 rounded-lg shadow-lg p-4 sm:p-5'
                              >
                                  <div className='flex justify-between items-center'>
                                      <Skeleton className='h-6 w-1/2 mb-2' />
                                      <Skeleton className='h-6 w-1/6 mb-2' />
                                  </div>
                                  <Skeleton className='h-4 w-full' />
                              </div>
                          ))
                        : homes.map((home) => (
                              <HomeCard
                                  key={home.id}
                                  home={home}
                                  removeHome={removeHome}
                                  isEditMode={isEditMode}
                                  // onClick={() => handleHomeClick(home.id)}
                              />
                          ))}
                </div>
            </div>
            <div className='col-span-1 flex flex-col gap-4'>
                <RecentActivities />
                <PowerChart />
            </div>
        </div>
    )
}

export default Homes
