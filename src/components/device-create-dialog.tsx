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
import { toast } from 'sonner'
import { AlertCircle, Loader } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SidebarMenuSubButton } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { Plus } from 'lucide-react'
import { PlugZap, Heater, Tv, Refrigerator, SquarePower, Lightbulb, Bolt, DoorClosed } from 'lucide-react'
// import createDevice from '@/apis/Devices/CreateDevice'
import { createDevice } from '@/apis/Devices/DeviceService'

export function DeviceCreateDialog({ addDevice, homePodId }) {
    const [formData, setFormData] = useState({
        name: '',
        icon: '',
        description: ''
    })
    const [alertVisible, setAlertVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, icon, description } = formData
        if (!name || !icon || !description) {
            setAlertVisible(true)
            return
        }

        setIsLoading(true)
        try {
            const createdDevice = await createDevice(homePodId, formData)
            addDevice(createdDevice)
            setFormData({ name: '', icon: '', description: '' }) // Reset form data
            toast('Device have been created', {
                description: 'Your device have been successfully created.',
                action: {
                    label: 'Undo',
                    onClick: () => console.log('Undo')
                }
            })
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const isFormValid = formData.name && formData.icon && formData.description

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size='sm' className='gap-1 bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 transition-transform'>
                    <Plus />
                    <p className='hidden sm:flex'>Add Device</p>
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[450px] bg-gray-100 dark:bg-[#18191f] overflow-y-auto max-h-[70vh] rounded-lg shadow-lg p-4 transition-all duration-300'>
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-3 items-start'>
                        Add your new Device
                        <PlugZap size={16} />
                    </DialogTitle>
                    <DialogDescription>
                        Add the information about your Device here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    {alertVisible && (
                        <Alert variant='destructive'>
                            <AlertCircle className='h-4 w-4' />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>Please fill in all fields.</AlertDescription>
                        </Alert>
                    )}
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='name' className='text-right'>
                                Name
                            </Label>
                            <Input
                                id='name'
                                name='name'
                                placeholder='eg: Washing Machine'
                                className='col-span-3'
                                required={true}
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='description' className='text-right'>
                                Description
                            </Label>
                            <Textarea
                                id='description'
                                name='description'
                                placeholder='What is this device for?'
                                required={true}
                                className='col-span-3'
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='icon' className='text-right'>
                                Device Type
                            </Label>
                            <Select onValueChange={(val) => setFormData({ ...formData, icon: val })}>
                                <SelectTrigger className='col-span-3'>
                                    <SelectValue placeholder='Select' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='Heater'>
                                        <div className='flex items-center gap-2'>
                                            <Heater size={16} />
                                            Heater
                                        </div>
                                    </SelectItem>
                                    <SelectItem value='Refrigerator'>
                                        <div className='flex items-center gap-2'>
                                            <Refrigerator size={16} />
                                            Refrigerator
                                        </div>
                                    </SelectItem>
                                    <SelectItem value='Tv'>
                                        <div className='flex items-center gap-2'>
                                            <Tv size={16} />
                                            Television
                                        </div>
                                    </SelectItem>
                                    <SelectItem value='DoorClosed'>
                                        <div className='flex items-center gap-2'>
                                            <DoorClosed size={16} />
                                            Door
                                        </div>
                                    </SelectItem>
                                    <SelectItem value='SquarePower'>
                                        <div className='flex items-center gap-2'>
                                            <SquarePower size={16} />
                                            Relay
                                        </div>
                                    </SelectItem>
                                    <SelectItem value='Lightbulb'>
                                        <div className='flex items-center gap-2'>
                                            <Lightbulb size={16} />
                                            Lightbulb
                                        </div>
                                    </SelectItem>
                                    <SelectItem value='Bolt'>
                                        <div className='flex items-center gap-2'>
                                            <Bolt size={16} />
                                            Switch
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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
                                disabled={!isFormValid || isLoading}
                                className={!isFormValid ? 'dark:bg-gray-400' : ''}
                            >
                                {isLoading ? <Loader className='animate-spin' size={16} /> : 'Add new Device'}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
