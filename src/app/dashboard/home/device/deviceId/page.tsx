'use client'

import React, { useEffect, useState } from 'react'
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
import { type LucideIcon, Trash2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import moment from 'moment-timezone'
import { deleteDevice, triggerDevice } from '@/apis/Devices/DeviceService'
import { toast } from 'sonner'

interface DeviceCardProps {
    device: {
        id: string
        name: string
        status: number
        icon: string
        updatedAt: string
    }
    removeDevice: (id: string) => void
    isEditMode: boolean
    homePodId: string
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, removeDevice, isEditMode, homePodId }) => {
    const [isChecked, setIsChecked] = useState(device.status === 1)
    const [isDeleting, setIsDeleting] = useState(false)
    const [IconComponent, setIconComponent] = useState<LucideIcon | null>(null)

    useEffect(() => {
        setIsChecked(device.status === 1)
    }, [device.status])

    useEffect(() => {
        import('lucide-react').then((icons) => {
            setIconComponent(icons[device.icon as keyof typeof icons] as LucideIcon)
        })
    }, [device.icon])

    const handleToggle = async () => {
        const currentDate = moment().tz('Asia/Ho_Chi_Minh').format('dddd, MMMM DD, YYYY [at] h:mm A')
        toast(`${device.name} has been ${isChecked ? 'turned off' : 'turned on'}`, {
            description: currentDate,
            action: {
                label: 'Undo',
                onClick: () => console.log('Undo')
            }
        })
        const newStatus = isChecked ? 0 : 1
        setIsChecked(!isChecked)
        try {
            await triggerDevice(device.id, homePodId)
        } catch (error) {
            console.error('Error triggering device:', error)
            toast.error('Failed to trigger device. Please try again.')
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true)
        setTimeout(async () => {
            try {
                await deleteDevice(device.id)
                removeDevice(device.id)
                toast.success(`${device.name} has been deleted`)
            } catch (error) {
                console.error('Error deleting device:', error)
                toast.error('Failed to delete device. Please try again.')
                setIsDeleting(false)
            }
        }, 300)
    }

    const updatedAt = moment(device.updatedAt).tz('Asia/Ho_Chi_Minh')
    const timeZone = 'Asia/Ho_Chi_Minh'
    const timeText = isChecked
        ? `${moment().tz(timeZone).from(updatedAt, true)}`
        : `${updatedAt.format('MMM DD, YYYY, hh:mm A')}`

    return (
        <Card
            className={`group relative overflow-hidden transition-all duration-300 ease-in-out
                          ${isDeleting ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
                          hover:shadow-lg hover:-translate-y-1 
                          bg-gradient-to-br from-gray-50 to-gray-100 
                          dark:from-gray-800 dark:to-gray-900
                          border border-gray-200 dark:border-gray-700`}
        >
            <CardContent className='p-6'>
                <div className='flex justify-between items-center mb-4'>
                    <Badge variant={isChecked ? 'success' : 'secondary'} className='text-xs font-medium'>
                        {isChecked ? 'ON' : 'OFF'}
                    </Badge>
                    <Switch checked={isChecked} onCheckedChange={handleToggle} />
                </div>
                <div className='flex justify-center items-center mb-6'>
                    <div
                        className={`p-4 rounded-full transition-colors duration-300 ${isChecked ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-200 dark:bg-gray-700'}`}
                    >
                        {IconComponent && (
                            <IconComponent
                                size={40}
                                className={`transition-colors duration-300 ${isChecked ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                            />
                        )}
                    </div>
                </div>
                <div className='text-center'>
                    <h2 className='text-lg font-semibold text-gray-800 dark:text-white mb-2'>{device.name}</h2>
                    <div className='flex items-center justify-center gap-2'>
                        <span
                            className={`w-2 h-2 rounded-full ${isChecked ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}
                        ></span>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>{timeText}</p>
                    </div>
                </div>
            </CardContent>
            {isEditMode && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant='destructive'
                            size='icon'
                            className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                        >
                            <Trash2 className='h-4 w-4' />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete {device.name}?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the device and remove its
                                data from our servers.
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

export default DeviceCard
