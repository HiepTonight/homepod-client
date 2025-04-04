'use client'
import { SiHomeassistant } from 'react-icons/si'

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles, HousePlug } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { useNavigate } from 'react-router-dom'

export function NavSite() {
    const navigate = useNavigate()

    const { isMobile } = useSidebar()

    const handleClicked = () => {
        navigate('/dashboard')
    }

    return (
        // <SidebarMenu>
        //   <SidebarMenuItem>
        //     <DropdownMenu>
        //       <DropdownMenuTrigger asChild>
        <SidebarMenuButton
            onClick={handleClicked}
            size='lg'
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
            <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarFallback className='rounded-lg bg-blue-600'>
                    <SiHomeassistant className='text-white' />
                </AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>Smarthome</span>
                <span className='truncate text-xs'>Enterprise</span>
            </div>
            {/* <ChevronsUpDown className="ml-auto size-4" /> */}
        </SidebarMenuButton>
        //       </DropdownMenuTrigger>
        //       <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
        //         <DropdownMenuLabel className="p-0 font-normal">
        //           <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
        //             <Avatar className="h-8 w-8 rounded-lg">
        //               {/* <SiHomeassistant className="h-8 w-8 rounded-lg" /> */}
        //               <AvatarFallback className="rounded-lg"><SiHomeassistant/></AvatarFallback>
        //             </Avatar>
        //             <div className="grid flex-1 text-left text-sm leading-tight">
        //               <span className="truncate font-semibold">Smarthome</span>
        //               <span className="truncate text-xs">Enterprise</span>
        //             </div>
        //           </div>
        //         </DropdownMenuLabel>
        //         <DropdownMenuSeparator />
        //         <DropdownMenuGroup>
        //           <DropdownMenuItem>
        //             <Sparkles />
        //             Upgrade to Pro
        //           </DropdownMenuItem>
        //         </DropdownMenuGroup>
        //         <DropdownMenuSeparator />
        //         <DropdownMenuGroup>
        //           <DropdownMenuItem>
        //             <BadgeCheck />
        //             Account
        //           </DropdownMenuItem>
        //           <DropdownMenuItem>
        //             <CreditCard />
        //             Billing
        //           </DropdownMenuItem>
        //           <DropdownMenuItem>
        //             <Bell />
        //             Notifications
        //           </DropdownMenuItem>
        //         </DropdownMenuGroup>
        //         <DropdownMenuSeparator />
        //         <DropdownMenuItem>
        //           <LogOut />
        //           Log out
        //         </DropdownMenuItem>
        //       </DropdownMenuContent>
        //     </DropdownMenu>
        //   </SidebarMenuItem>
        // </SidebarMenu>
    )
}
