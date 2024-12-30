import React, { useState } from 'react'
import createHome from '../apis/Homes/CreateHome'

const NewHomeModal = ({ isVisible, onClose, addHome }) => {
    const [homeData, setHomeData] = useState({
        title: '',
        description: '',
        homePodId: ''
    })
    const [alertVisible, setAlertVisible] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setHomeData({ ...homeData, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { title, description, homePodId } = homeData
        if (!title || !description || !homePodId) {
            setAlertVisible(true)
            return
        }

        try {
            const createdHome = await createHome(homeData)
            addHome(createdHome.data)
            setHomeData({ title: '', description: '', homePodId: '' }) // Reset form data
            onClose()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    if (!isVisible) return null

    return (
        <div>
            <div
                tabIndex='-1'
                aria-hidden={!isVisible}
                className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75'
            >
                <div className='bg-[#1b1c1d] rounded-lg shadow-lg p-6 w-full max-w-md'>
                    <div className='flex items-center justify-between pb-4 border-b border-gray-700'>
                        <h3 className='text-lg font-semibold text-white'>Create New Home</h3>
                        <button onClick={onClose} className='text-gray-400 hover:text-gray-200'>
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className='pt-4'>
                        {alertVisible && (
                            <div
                                className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'
                                role='alert'
                            >
                                <strong className='font-bold'>Error!</strong>
                                <span className='block sm:inline'> Please fill in all fields.</span>
                                <span
                                    onClick={() => setAlertVisible(false)}
                                    className='absolute top-0 bottom-0 right-0 px-4 py-3'
                                >
                                    <svg
                                        className='fill-current h-6 w-6 text-red-500'
                                        role='button'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 20 20'
                                    >
                                        <title>Close</title>
                                        <path d='M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414L8.828 10l-3.176 3.176a1 1 0 101.414 1.414L10 12.828l2.934 2.934a1 1 0 001.414-1.414L11.172 10l3.176-3.176z' />
                                    </svg>
                                </span>
                            </div>
                        )}
                        <div className='mb-4'>
                            <label htmlFor='title' className='block text-sm font-medium text-gray-400'>
                                Title
                            </label>
                            <input
                                type='text'
                                name='title'
                                id='title'
                                className='mt-1 block w-full p-2 border border-gray-700 rounded-md bg-[#2a2b2d] text-white'
                                value={homeData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='description' className='block text-sm font-medium text-gray-400'>
                                Description
                            </label>
                            <textarea
                                name='description'
                                id='description'
                                rows='4'
                                className='mt-1 block w-full p-2 border border-gray-700 rounded-md bg-[#2a2b2d] text-white'
                                value={homeData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='homePodId' className='block text-sm font-medium text-gray-400'>
                                Home Pod ID
                            </label>
                            <input
                                type='text'
                                name='homePodId'
                                id='homePodId'
                                className='mt-1 block w-full p-2 border border-gray-700 rounded-md bg-[#2a2b2d] text-white'
                                value={homeData.homePodId}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex justify-end'>
                            <button
                                type='button'
                                onClick={onClose}
                                className='bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 transition duration-200'
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200'
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewHomeModal
