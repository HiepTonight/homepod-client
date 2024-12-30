import { useEffect, useState } from 'react'
import getUserHomes from '../../apis/Homes/GetUserHomes'
import { useNavigate } from 'react-router-dom'
import HomeCard from '../../pages/Home/HomeCard'
import { GoPlus } from 'react-icons/go'
import { TiEdit } from 'react-icons/ti'
import { MdOutlineAddHome } from 'react-icons/md'
import { PowerChart } from '@/components/power-chart'
import { HomeCreateButton } from '@/components/home-create-button'
import NewHomeModal from '../../components/NewHomeModal'
import { Button } from '@/components/ui/button'
import { getAllHomes } from '@/apis/Homes/HomeService'

interface HomeProps {
    onHomeNameChange: (name: string) => void
}

const Homes = () => {
    const [homes, setHomes] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchHomes = async () => {
            try {
                const data = await getAllHomes()
                // console.log('data', data)
                setHomes(data.data.data || []) // Đảm bảo rằng homes luôn là một mảng
            } catch (error) {
                console.error('Error fetching homes:', error)
            }
        }

        fetchHomes()
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

    const handleAddHome = () => {
        setIsModalVisible(true)
    }

    const addHome = (newHome) => {
        setHomes([...homes, newHome])
    }

    return (
        <div className='p-5 grid grid-cols-3 gap-4'>
            <div className=' justify-around gap-4  p-5 rounded-xl shadow-lg col-span-2 bg-gradient-to-r from-[#1b2a55] to-[#081d41]'>
                <div className='flex justify-between items-center pb-2'>
                    <h1 className='text-sm sm:text-xl font-medium text-white items-center'>Your sweet homes!</h1>
                    <div className='flex gap-2'>
                        <Button
                            className={`flex justify-between items-center gap-[3px] rounded-md p-1 px-2 sm:px-3 cursor-pointer transition-colors duration-300 ${isEditMode ? 'bg-blue-600 text-white' : 'text-gray-400 bg-gray-700'}`}
                            onClick={toggleEditMode}
                        >
                            <p className='hidden sm:flex'>Edit</p>
                            <TiEdit />
                        </Button>
                        {/* <Button
                            className='flex justify-between items-center gap-[3px] text-white bg-blue-600 hover:bg-blue-500 rounded-md p-1 px-2 sm:px-3 cursor-pointer'
                            onClick={handleAddHome}
                        >
                            <p className='hidden sm:flex'>Add Home</p>
                            <MdOutlineAddHome />
                        </Button> */}
                        <HomeCreateButton addHome={addHome} />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4'>
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
                <NewHomeModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} addHome={addHome} />
            </div>
            <div className='col-span-1'>
                <PowerChart />
            </div>
        </div>
    )
}

export default Homes
