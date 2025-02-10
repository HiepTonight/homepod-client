import { AlertTriangle, Info, CheckCircle, BellRing } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Notification {
    id: number
    type: 'alert' | 'warning' | 'info' | 'success'
    content: string
    time: string
    read: boolean
}

interface NotificationItemProps {
    notification: Notification
}

export function NotificationItem({ notification }: NotificationItemProps) {
    const { type, content, time, read } = notification

    const getIcon = () => {
        switch (type) {
            case 'alert':
                return <BellRing className='h-5 w-5 text-red-500' />
            case 'warning':
                return <AlertTriangle className='h-5 w-5 text-yellow-500' />
            case 'info':
                return <Info className='h-5 w-5 text-blue-500' />
            case 'success':
                return <CheckCircle className='h-5 w-5 text-green-500' />
            default:
                return null
        }
    }

    const formattedTime = formatDistanceToNow(new Date(time), { addSuffix: true })

    return (
        <div className={`flex items-start space-x-4 p-3 ${read ? 'opacity-60' : ''}`}>
            <div className='flex-shrink-0 mt-1'>{getIcon()}</div>
            <div className='flex-grow min-w-0'>
                <p className='text-sm font-medium leading-5 text-gray-900 dark:text-gray-100'>{content}</p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>{formattedTime}</p>
            </div>
            {!read && <div className='flex-shrink-0 ml-auto mt-1 h-2 w-2 rounded-full bg-blue-500'></div>}
        </div>
    )
}
