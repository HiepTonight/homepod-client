import React, { useState, useEffect } from 'react'
import { Settings, Search } from 'lucide-react'
import { Sidebar } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-separator'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import getUserHomes from '@/apis/Homes/GetUserHomes'
import getUserInfo from '@/apis/Auth/getUserInfo'
import updateUserInfo from '@/apis/User/updateUserInfo'

const page = () => {
    const [user, setUser] = useState({
        username: '',
        displayName: '',
        email: '',
        phone: '',
        about: '',
        defaultHomeId: ''
    })
    const [currentView, setCurrentView] = useState('information')
    const [animating, setAnimating] = useState(false)
    const [homes, setHomes] = useState([])

    useEffect(() => {
        const fetchHomes = async () => {
            try {
                const data = await getUserHomes()
                setHomes(data.data)
            } catch (error) {
                console.error('Error fetching homes:', error)
            }
        }
        fetchHomes()
    }, [])

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo()
                setUser({
                    username: data.data.username || '',
                    displayName: data.data.displayName || '',
                    email: data.data.email || '',
                    phone: data.data.phone || '',
                    about: data.data.about || '',
                    defaultHomeId: data.data.defaultHomeId || ''
                })
            } catch (error) {
                console.error('Error fetching user info:', error)
            }
        }
        fetchUserInfo()
    }, [])

    const handleViewChange = (view) => {
        if (currentView !== view) {
            setAnimating(true)
            setTimeout(() => {
                setCurrentView(view)
                setAnimating(false)
            }, 300) // Duration of the animation
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }

    const handleSave = async () => {
        try {
            const response = await updateUserInfo(user)
            console.log('User info updated:', response)
            toast.success('Information updated successfully')
        } catch (error) {
            console.error('Error updating user info:', error)
            toast.error('Failed to update information')
        }
    }

    const handleHomeChange = (value) => {
        setUser((prevUser) => ({
            ...prevUser,
            defaultHomeId: value
        }))
    }

    const defaultHomeName = homes.find(home => home.id === user.defaultHomeId)?.title || 'Select'

    return (
        <div className='px-5 flex flex-col lg:grid lg:grid-cols-4 gap-4'>
            <div className='col-span-1 flex flex-col gap-4'>
                <div className='p-2 bg-slate-800 rounded-lg shadow-lg flex flex-col items-center gap-1'>
                    <div className='p-2'>
                        <Settings size={36} />
                    </div>
                    <div>
                        <p className='mb-2 max-w-2xl font-bold text-xl'>Setting</p>
                    </div>
                    <div className='relative w-full'>
                        <Input placeholder='Search for setting' className='pl-10' />
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                    </div>
                </div>
                <div className='p-4 bg-slate-800 rounded-lg shadow-lg flex flex-col gap-2'>
                    <div>
                        <button className='flex items-center gap-2' onClick={() => handleViewChange('information')}>
                            <Settings size={16} />
                            <p className='max-w-2xl font-semibold'>Your information</p>
                        </button>
                    </div>
                    <div>
                        <button className='flex items-center gap-2' onClick={() => handleViewChange('security')}>
                            <Settings size={16} />
                            <p className='max-w-2xl font-semibold'>Security and Password</p>
                        </button>
                    </div>
                    <div>
                        <button className='flex items-center gap-2' onClick={() => handleViewChange('application')}>
                            <Settings size={16} />
                            <p className='max-w-2xl font-semibold'>Application Setting</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className='bg-slate-800 p-4 rounded-lg shadow-lg col-span-3'>
                <div className={`transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
                    {currentView === 'information' && (
                        <div>
                            <div className='px-4 sm:px-0'>
                                <h3 className='text-base/7 font-semibold '>Information</h3>
                                <p className='mt-1 max-w-2xl text-sm/6 '>Personal details and application.</p>
                            </div>
                            <div className='mt-6 border-t border-gray-100'>
                                <dl className=''>
                                    <div className='px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                                        <dt className='text-sm/6 font-medium sm:col-span-1'>Username</dt>
                                        <Input
                                            className='mt-1 text-sm/6 0 sm:col-span-3 sm:mt-0'
                                            name='username'
                                            value={user.username}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                                        <dt className='text-sm/6 font-medium sm:col-span-1'>Display Name</dt>
                                        <Input
                                            className='mt-1 text-sm/6 0 sm:col-span-3 sm:mt-0'
                                            name='displayName'
                                            value={user.displayName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                                        <dt className='text-sm/6 font-medium sm:col-span-1'>Email address</dt>
                                        <Input
                                            className='mt-1 text-sm/6 0 sm:col-span-3 sm:mt-0'
                                            name='email'
                                            value={user.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                                        <dt className='text-sm/6 font-medium sm:col-span-1'>Phone Number</dt>
                                        <Input
                                            className='mt-1 text-sm/6 0 sm:col-span-3 sm:mt-0'
                                            name='phoneNumber'
                                            value={user.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                                        <dt className='text-sm/6 font-medium sm:col-span-1'>About</dt>
                                        <Textarea
                                            className='mt-1 text-sm/6 0 sm:col-span-3 sm:mt-0 resize-none overflow-hidden'
                                            name='about'
                                            value={user.about}
                                            onChange={handleInputChange}
                                            rows={5}
                                        />
                                    </div>
                                </dl>
                            </div>
                            <div className='flex justify-end p-2'>
                                <Button className='bg-blue-500 text-white hover:bg-blue-400' onClick={handleSave}>Save</Button>
                            </div>
                        </div>
                    )}
                    {currentView === 'application' && (
                        <div>
                            <div className='px-4 sm:px-0'>
                                <h3 className='text-base/7 font-semibold '>Application Setting</h3>
                                <p className='mt-1 max-w-2xl text-sm/6 '>Application specific settings.</p>
                            </div>
                            <div className='mt-6 border-t border-gray-100'>
                                <div className='px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                                    <dt className='text-sm/6 font-medium '>Default Homepage</dt>
                                    <Select onValueChange={handleHomeChange}>
                                        <SelectTrigger className='col-span-2'>
                                            <SelectValue placeholder={defaultHomeName} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {homes.map((home) => (
                                                <SelectItem key={home.id} value={home.id}>
                                                    {home.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className='flex justify-end p-2'>
                                <Button className='bg-blue-500 text-white hover:bg-blue-400' onClick={handleSave}>Save</Button>
                            </div>
                        </div>
                    )}
                    {currentView === 'security' && (
                        <div>
                            <div className='px-4 sm:px-0'>
                                <h3 className='text-base/7 font-semibold '>Security and Password</h3>
                                <p className='mt-1 max-w-2xl text-sm/6 '>Manage your security settings and password.</p>
                            </div>
                            <div className='mt-6 border-t border-gray-100'>
                                <dl className=''>
                                    <div className='px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                                        <dt className='text-sm/6 font-medium '>Old Password</dt>
                                        <Input className='mt-1 text-sm/6 0 sm:col-span-2 sm:mt-0' />
                                    </div>
                                    <div className='px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                                        <dt className='text-sm/6 font-medium '>New Password</dt>
                                        <Input className='mt-1 text-sm/6 0 sm:col-span-2 sm:mt-0' />
                                    </div>
                                    <div className='px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0'>
                                        <dt className='text-sm/6 font-medium '>Confirm Password</dt>
                                        <Input className='mt-1 text-sm/6 0 sm:col-span-2 sm:mt-0' />
                                    </div>
                                </dl>
                            </div>
                            <div className='flex justify-end p-2'>
                                <Button className='bg-blue-500 text-white hover:bg-blue-400'>Save</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default page
