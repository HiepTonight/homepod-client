import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog'
import { SidebarMenuSubButton } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import createHome from '../apis/Homes/CreateHome'

export function HomeCreateDialog({ addHome }) {
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
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const isFormValid = homeData.title && homeData.description && homeData.homePodId

    return (
        <Dialog>
            <DialogTrigger asChild>
                <SidebarMenuSubButton asChild>
                    <div className='cursor-pointer flex justify-between items-center'>
                        Add Home
                        <Plus />
                    </div>
                </SidebarMenuSubButton>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[450px] bg-gray-100 dark:bg-[#18191f]'>
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-3 items-start'>
                        Add your new Home
                        <Sparkles size={16} />
                    </DialogTitle>
                    <DialogDescription>
                        Add the information about your home here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='grid gap-4 py-4'>
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
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='title' className='text-right'>
                            Title
                        </Label>
                        <Input
                            type='text'
                            name='title'
                            id='title'
                            className='col-span-3'
                            value={homeData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='description' className='text-right'>
                            Description
                        </Label>
                        <Input
                            type='text'
                            name='description'
                            id='description'
                            className='col-span-3'
                            value={homeData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='homePodId' className='text-right'>
                            Home Pod ID
                        </Label>
                        <Input
                            type='text'
                            name='homePodId'
                            id='homePodId'
                            className='col-span-3'
                            value={homeData.homePodId}
                            onChange={handleChange}
                        />
                    </div>
                    <DialogFooter className='flex gap-2'>
                        <DialogClose asChild>
                            <Button type='button' variant='secondary' onClick={() => setAlertVisible(false)}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                type='submit'
                                disabled={!isFormValid}
                                className={!isFormValid ? 'dark:bg-gray-400' : ''}
                            >
                                Save changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
