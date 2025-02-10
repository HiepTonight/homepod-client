'use client'

import React from 'react'
import { useState, useMemo } from 'react'
import { Bell, ChevronDown, Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { NotificationItem } from './notification-item'

// Enhanced mock data for smart home notifications
const generateMockNotifications = (count: number) => {
    const types = ['alert', 'warning', 'info', 'success'] as const
    const devices = ['Living Room', 'Kitchen', 'Bedroom', 'Garage', 'Front Door', 'Backyard']
    const actions = [
        'Motion detected',
        'Temperature above threshold',
        'Device offline',
        'Low battery',
        'Door unlocked',
        'Lights turned on',
        'Water leak detected',
        'Smoke detected',
        'Energy consumption high',
        'New device connected'
    ]

    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        type: types[Math.floor(Math.random() * types.length)],
        content: `${actions[Math.floor(Math.random() * actions.length)]} in ${devices[Math.floor(Math.random() * devices.length)]}`,
        time: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString(),
        read: Math.random() > 0.3
    }))
}

const initialNotifications = generateMockNotifications(10)

export function NotificationButton() {
    const [notifications, setNotifications] = useState([])
    const [visibleCount, setVisibleCount] = useState(5)
    const [isOpen, setIsOpen] = useState(false)

    const sortedNotifications = useMemo(() => {
        return [...notifications].sort((a, b) => {
            if (a.read !== b.read) return a.read ? 1 : -1
            return new Date(b.time).getTime() - new Date(a.time).getTime()
        })
    }, [notifications])

    const unreadCount = notifications.filter((n) => !n.read).length

    const markAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })))
    }

    const handleNotificationClick = (id: number) => {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
        // Here you would typically navigate to the relevant page or open a modal
        console.log(`Clicked notification ${id}`)
    }

    const loadMoreNotifications = (event: React.MouseEvent) => {
        event.preventDefault()
        const newNotifications = generateMockNotifications(5)
        setNotifications([...notifications, ...newNotifications])
        setVisibleCount(visibleCount + 5)
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    size='icon'
                    className='relative bg-gray-400 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200'
                >
                    <Bell className='text-white' size={20} />
                    {unreadCount > 0 && (
                        <Badge
                            variant='destructive'
                            className='absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-red-500'
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg'
                align='end'
            >
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex justify-between items-center'>
                        <p className='text-sm font-medium leading-none text-gray-900 dark:text-gray-100'>
                            Notifications
                        </p>
                        {notifications.length > 0 && (
                            <Button
                                variant='ghost'
                                size='sm'
                                onClick={markAllAsRead}
                                className='text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
                            >
                                Mark all as read
                            </Button>
                        )}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-gray-200 dark:bg-gray-700' />
                <ScrollArea className='h-[400px] overflow-y-auto'>
                    {notifications.length === 0 ? (
                        <div className='flex flex-col items-center justify-center h-full p-6 mt-16'>
                            <div className='rounded-full bg-gray-200 dark:bg-gray-700 w-20 h-20 flex items-center justify-center mb-4'>
                                <Inbox size={40} className='text-gray-500 dark:text-gray-400' />
                            </div>
                            <p className='font-bold text-gray-600 dark:text-gray-300'>No notifications</p>
                            <p className='text-sm text-gray-500 dark:text-gray-400 text-center mt-2'>
                                You're all caught up! We'll notify you when there's something new.
                            </p>
                        </div>
                    ) : (
                        <DropdownMenuGroup>
                            {sortedNotifications.slice(0, visibleCount).map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                    onSelect={() => handleNotificationClick(notification.id)}
                                    className='focus:bg-gray-100 dark:focus:bg-gray-700 cursor-pointer'
                                >
                                    <NotificationItem notification={notification} />
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    )}
                    {visibleCount < notifications.length && (
                        <div className='p-2'>
                            <Button
                                variant='outline'
                                size='sm'
                                className='w-full text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:text-blue-800 dark:focus:text-blue-300'
                                onClick={loadMoreNotifications}
                            >
                                <ChevronDown className='mr-2 h-4 w-4' />
                                View Earlier
                            </Button>
                        </div>
                    )}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
