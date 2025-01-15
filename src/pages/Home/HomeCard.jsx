import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { useNavigate } from 'react-router-dom'
import { IoTrashOutline } from 'react-icons/io5'
import { IoHome } from 'react-icons/io5'
import { House } from 'lucide-react'
import { deleteHome } from '../../apis/Homes/HomeService'
// import deleteHome from '../../apis/Homes/DeleteHome';

const HomeCard = ({ home, removeHome, isEditMode }) => {
    const [isDeleting, setIsDeleting] = useState(false)

    const navigate = useNavigate()

    const handleHomeClick = () => {
        navigate(`/dashboard/home?id=${home.id}`)
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
        <Card
            className={`group relative overflow-hidden cursor-pointer transition-all duration-300 ease-in-out
                  ${isDeleting ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
                  hover:shadow-lg hover:-translate-y-1 
                  bg-gradient-to-br from-white to-gray-100 
                  dark:from-gray-800 dark:to-gray-900
                  border border-gray-200 dark:border-gray-700`}
            onClick={handleHomeClick}
        >
            <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out' />
            <CardHeader className='pb-2'>
                <div className='flex justify-between items-center'>
                    <CardTitle className='text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
                        {home.title}
                    </CardTitle>
                    <House className='text-gray-500 dark:text-gray-400 text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300' />
                </div>
            </CardHeader>
            <CardContent>
                <p className='text-gray-600 dark:text-gray-300 text-sm line-clamp-2 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300 mb-3'>
                    {home.description}
                </p>
                <div className='flex justify-between items-center'>
                    <Badge
                        variant='secondary'
                        className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                    >
                        {home.rooms} {home.rooms === 1 ? 'Room' : 'Rooms'}
                    </Badge>
                    <Badge
                        variant='secondary'
                        className='bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
                    >
                        {home.area} m²
                    </Badge>
                </div>
            </CardContent>
            {isEditMode && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant='destructive'
                            size='icon'
                            className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <IoTrashOutline className='h-4 w-4' />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent onClick={(e) => e.stopPropagation()} className='sm:max-w-[425px]'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete "{home.title}"? This action cannot be undone, and all
                                associated data will be permanently removed from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </Card>
    )
}

export default HomeCard
