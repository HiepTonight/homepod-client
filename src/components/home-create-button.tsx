import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { toast } from 'sonner'
import { SidebarMenuSubButton } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Sparkles, HousePlus, AlertCircle } from 'lucide-react'
import createHome from '../apis/Homes/CreateHome'
import { DialogClose } from '@radix-ui/react-dialog'

export function HomeCreateButton({ addHome }) {
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
            toast('Home have been created', {
                description: 'Your home have been successfully created.',
                action: {
                    label: 'Undo',
                    onClick: () => console.log('Undo')
                }
            })
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const isFormValid = homeData.title && homeData.description && homeData.homePodId

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='text-white bg-blue-600 hover:bg-blue-500'>
                    <p className='hidden sm:flex'>Add Home</p>
                    
                    <HousePlus />
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[450px] bg-[#18191f]'>
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
                        <Alert variant='destructive'>
                            <AlertCircle className='h-4 w-4' />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>Please fill in all fields.</AlertDescription>
                        </Alert>
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
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='submit' disabled={!isFormValid} className={!isFormValid ? 'bg-gray-400' : ''}>
                                Save changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
