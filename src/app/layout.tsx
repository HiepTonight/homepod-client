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

export default function Page() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const homeId = searchParams.get('id')
    const [homeName, setHomeName] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        }
    }, [navigate])

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
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
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
                        </Breadcrumb>
                    </div>
                    <div className='flex items-center gap-2 px-4'>
                        <Button className='bg-gray-600 hover:bg-gray-500 h-9 rounded-md px-3'>
                          <Bell className='text-white' size={20}/>
                        </Button>
                        <div className='relative hidden md:flex'>
                            <Input placeholder='Look for something ?' className='pl-10' />
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        </div>
                    </div>
                </header>
                <Outlet context={{ onHomeNameChange: handleHomeNameChange }} />
            </SidebarInset>
        </SidebarProvider>
    )
}
