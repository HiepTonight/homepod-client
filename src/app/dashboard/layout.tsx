import { React, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Search, Bell } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/global/theme-toggle'
import { NotificationButton } from '@/components/notification-button'

export default function Page() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const homeId = searchParams.get('id')
    const [homeName, setHomeName] = useState('')
    const navigate = useNavigate()

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (!token) {
    //         navigate('/login')
    //     }
    // }, [navigate])

    const handleHomeNameChange = (name) => {
        setHomeName(name)
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className='flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator orientation='vertical' className='mr-2 h-4' />
                        Welcome home!
                        {/* <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href='/dashboard'>Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                {homeId && homeName && (
                                    <>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{homeName}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </>
                                )}
                            </BreadcrumbList>
                        </Breadcrumb> */}
                    </div>
                    <div className='flex items-center gap-2 px-4'>
                        <div className='relative hidden md:flex'>
                            <Input placeholder='Look for something ?' className='pl-10' />
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        </div>
                        <ThemeToggle
                            className={'bg-gray-400 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'}
                            dark={'text-white'}
                        />
                        {/* <Button
                            variant='ghost'
                            size='icon'
                            className='bg-gray-400 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                        >
                            <Bell className='text-white' size={20} />
                        </Button> */}
                        <NotificationButton />
                    </div>
                </header>
                <main className='h-full'>
                    <Outlet context={{ onHomeNameChange: handleHomeNameChange }} />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
