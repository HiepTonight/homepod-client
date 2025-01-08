import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { useNavigate } from 'react-router-dom'
import { IoTrashOutline } from 'react-icons/io5'
import { IoHome } from 'react-icons/io5'
import { deleteHome } from '../../apis/Homes/HomeService'
// import deleteHome from '../../apis/Homes/DeleteHome';

const HomeCard = ({ home, removeHome, isEditMode }) => {
    const [isDeleting, setIsDeleting] = useState(false)

    const navigate = useNavigate()

    const handleHomeClick = () => {
        navigate(`/home?id=${home.id}`)
    }

    const handleDelete = async () => {
        setIsDeleting(true)
        setTimeout(async () => {
            try {
                await deleteHome(home.id)
                removeHome(home.id)
            } catch (error) {
                console.error('Error deleting home:', error)
            }
        }, 300)
    }

    return (
        <div
            className={`flex flex-col relative justify-between gap-2 bg-slate-900 rounded-lg shadow-lg p-4 sm:p-5 cursor-pointer transition-transform transform duration-300 ${isDeleting ? 'scale-0' : 'scale-100'}`}
            onClick={handleHomeClick}
        >
            {/* <button
                onClick={(e) => {
                    e.stopPropagation()
                    handleDelete()
                }}
                className={`flex justify-center items-center absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-700 transition-opacity duration-300 ${isEditMode ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <IoTrashOutline />
            </button> */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            // handleDelete()
                        }}
                        className={`flex justify-center items-center absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-700 transition-opacity duration-300 ${isEditMode ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                    >
                        <IoTrashOutline />
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg sm:text-base font-semibold text-white'>{home.title}</h1>
                <IoHome className='text-gray-400 text-2xl' />
            </div>
            <div className='flex justify-between items-center text-gray-400'>
                <p>{home.description}</p>
            </div>
        </div>
    )
}

export default HomeCard
