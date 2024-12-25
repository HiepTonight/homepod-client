import React from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SidebarMenuSubButton } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { Plus } from 'lucide-react'
import { PlugZap, Heater, Tv, Refrigerator, SquarePower, Lightbulb, Bolt } from 'lucide-react'

export function DeviceCreateDialog() {
    const [formData, setFormData] = React.useState({
        name: '',
        description: '',
        deviceType: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form data:', formData)
        // ...do something with form data...
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='gap-1 bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 transition-transform'>
                    <Plus />
                    Add Device
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[450px] bg-[#18191f] overflow-y-auto max-h-[70vh] rounded-lg shadow-lg p-4 transition-all duration-300'>
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
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='name' className='text-right'>
                                Name
                            </Label>
                            <Input
                                id='name'
                                placeholder='My sweet home!'
                                className='col-span-3'
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='username' className='text-right'>
                                Description
                            </Label>
                            <Textarea
                                id='description'
                                placeholder='This is my sweet home!'
                                className='col-span-3'
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='username' className='text-right'>
                                Device Type
                            </Label>
                            <Select onValueChange={(val) => setFormData({ ...formData, deviceType: val })}>
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
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='button' variant='secondary' className='mr-2'>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type='submit'>Add new Device</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
