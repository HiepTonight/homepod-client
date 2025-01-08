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
import { type LucideIcon, LucideProps } from 'lucide-react'
import { IoTrashOutline } from 'react-icons/io5'
import { Switch } from '@/components/ui/switch'
import moment from 'moment-timezone'
import { formatDistanceToNow, format } from 'date-fns'
import { deleteDevice, triggerDevice } from '@/apis/Devices/DeviceService'
import { toast } from 'sonner'

const DeviceCard = ({ device, removeDevice, isEditMode, homePodId }) => {
    const [isChecked, setIsChecked] = useState(device.status === 1)
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [IconComponent, setIconComponent] = useState<LucideIcon | null>(null)

    useEffect(() => {
        setIsChecked(device.status === 1)
    }, [device.status])

    useEffect(() => {
        // console.log('Device icon:', device.icon)
        import(`lucide-react`).then((icons) => {
            setIconComponent(icons[device.icon as keyof typeof icons] as LucideIcon)
        })
    }, [device.icon])

    const handleToggle = async () => {
        const currentDate = moment().tz('Asia/Ho_Chi_Minh').format('dddd, MMMM DD, YYYY [at] h:mm A')
        toast(`${device.name} has been trigger`, {
            description: currentDate,
            action: {
                label: 'Undo',
                onClick: () => console.log('Undo')
            }
        })
        const newStatus = isChecked ? 0 : 1
        setIsChecked(!isChecked)
        try {
            const data = await triggerDevice(device.id, homePodId)
            // console.log('Device triggered:', data)
        } catch (error) {
            console.error('Error triggering device:', error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true)
        setTimeout(async () => {
            try {
                await deleteDevice(device.id)
                removeDevice(device.id)
            } catch (error) {
                console.error('Error deleting device:', error)
            }
        }, 300) // Match the duration of the animation
    }

    const updatedAt = moment(device.updatedAt).tz('Asia/Ho_Chi_Minh')
    const isDeviceOn = device.status === 1
    const timeZone = 'Asia/Ho_Chi_Minh'
    const currentTime = moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss')

    // console.log(`Current time in ${timeZone}: ${currentTime}`)
    const timeText = isChecked
        ? `${moment().tz(timeZone).fromNow(updatedAt)}`
        : `${moment().tz(timeZone).format('MMM DD, YYYY, hh:mm A')}`

    return (
        <div
            className={`flex flex-col justify-around items-center bg-[#272a30] rounded-xl shadow-lg p-4 relative transition-transform duration-300 ${
                isDeleting ? 'scale-0' : 'scale-100'
            }`}
        >
            {/* <button
                onClick={handleDelete}
                className={`flex justify-center items-center absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-red-500 text-white hover:bg-red-700 transition-opacity duration-300 ${
                    isEditMode ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                <IoTrashOutline />
            </button> */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button
                        className={`flex justify-center items-center absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-red-500 text-white hover:bg-red-700 transition-opacity duration-300 ${
                            isEditMode ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
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
            <div className='flex justify-between w-full px-4'>
                <div className={`transition-colors duration-500 ${isChecked ? 'text-green-500' : 'text-gray-400'}`}>
                    {isChecked ? 'ON' : 'OFF'}
                </div>
                <Switch checked={isChecked} onCheckedChange={handleToggle} />
            </div>
            <div className='flex justify-center items-center mt-4 bg-[#373b41] rounded-full p-2 w-20 h-20'>
                {IconComponent && <IconComponent size={32} />}
            </div>
            <div className='mt-4 flex flex-col mt-2 justify-around items-center gap-1'>
                <h2>{device.name}</h2>
                <div className='flex items-center gap-2'>
                    <span
                        className={`w-2 h-2 rounded-full transition-colors duration-500 ${isChecked ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}
                    ></span>
                    <p className='font-light text-gray-400'>{timeText}</p>
                </div>
            </div>
        </div>
    )
}

export default DeviceCard
