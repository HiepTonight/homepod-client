import { Plus } from 'lucide-react'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { SidebarMenuSubButton } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export function HomeCreateDialog() {
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
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>
                            Name
                        </Label>
                        <Input id='name' placeholder='My sweet home!' className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='username' className='text-right'>
                            Description
                        </Label>
                        <Input id='username' placeholder='Home@' className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='username' className='text-right'>
                            Home Pod ID
                        </Label>
                        <Input id='username' className='col-span-3' />
                    </div>
                </div>
                <DialogFooter>
                    <Button type='submit'>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
