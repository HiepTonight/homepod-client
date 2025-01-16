import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight, RefreshCcw, Share2, Plus, LayoutGrid } from 'lucide-react'

export function DashboardPreview() {
    let theme = localStorage.getItem('theme')
    return (
        <section className='py-16 relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br from-rose-500/20 via-blue-500/20 to-purple-500/20 blur-3xl opacity-50' />
            <div className='container relative'>
                <div className='text-center max-w-2xl mx-auto mb-12'>
                    <Badge className='mb-4' variant='outline'>
                        Product
                    </Badge>
                    <h2 className='text-3xl font-bold mb-4'>Helpful Dashboard for Your Entire Home</h2>
                    <p className='text-muted-foreground'>
                        From light bulbs and plugs to thermostats, cameras, locks, and other devices. Monitor and
                        control everything in one place.
                    </p>
                </div>
                <div className='relative mx-auto max-w-6xl'>
                    {/* Gradient border effect */}
                    <div className='absolute -inset-1 bg-gradient-to-r from-rose-500 via-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-40' />

                    {/* Window chrome */}
                    <Card className='relative bg-background backdrop-blur-xl rounded-xl overflow-hidden border-0 shadow-2xl'>
                        {/* Window controls */}
                        <div className='flex items-center gap-2 p-4 border-b bg-muted/40'>
                            {/* Window controls */}
                            <div className='flex gap-2'>
                                <div className='w-3 h-3 rounded-full bg-red-500' />
                                <div className='w-3 h-3 rounded-full bg-yellow-500' />
                                <div className='w-3 h-3 rounded-full bg-green-500' />
                            </div>

                            {/* Navigation controls */}
                            <div className='flex items-center gap-2 ml-4'>
                                <Button variant='ghost' size='icon' className='h-8 w-8'>
                                    <ArrowLeft className='h-4 w-4' />
                                </Button>
                                <Button variant='ghost' size='icon' className='h-8 w-8'>
                                    <ArrowRight className='h-4 w-4' />
                                </Button>
                                <Button variant='ghost' size='icon' className='h-8 w-8'>
                                    <RefreshCcw />
                                </Button>
                            </div>

                            {/* URL bar */}
                            <div className='flex-1 mx-4'>
                                <div className='flex items-center h-8 px-3 bg-background border rounded-md'>
                                    <span className='text-sm text-muted-foreground'>homepod.app</span>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className='flex items-center gap-2'>
                                <Button variant='ghost' size='icon' className='h-8 w-8'>
                                    <Share2 className='h-4 w-4' />
                                </Button>
                                <Button variant='ghost' size='icon' className='h-8 w-8'>
                                    <Plus className='h-4 w-4' />
                                </Button>
                                <Button variant='ghost' size='icon' className='h-8 w-8'>
                                    <LayoutGrid className='h-4 w-4' />
                                </Button>
                            </div>
                        </div>

                        {/* Tabs */}
                        {/* <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="w-full justify-start rounded-none border-b bg-muted/40 p-0 h-10">
                            <TabsTrigger 
                            value="overview" 
                            className="rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-background"
                            >
                            Overview
                            </TabsTrigger>
                            <TabsTrigger 
                            value="analytics" 
                            className="rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-background"
                            >
                            Analytics
                            </TabsTrigger>
                            <TabsTrigger 
                            value="settings" 
                            className="rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-background"
                            >
                            Settings
                            </TabsTrigger>
                        </TabsList>
                        </Tabs> */}

                        {/* Dashboard content */}
                        <div className='p-4'>
                            <div className='grid grid-cols-1 gap-0 relative aspect-video'>
                                <img
                                    src='./light-dashboard.png'
                                    alt='Dashboard interface'
                                    width={800}
                                    height={600}
                                    className='w-full h-full rounded-lg shadow-2xl object-contain
            [grid-area:1/1] transition-opacity duration-300 ease-in-out
            opacity-100 dark:opacity-0'
                                />
                                <img
                                    src='./dark-dashboard.png'
                                    alt='Dashboard interface'
                                    width={800}
                                    height={600}
                                    className='w-full h-full rounded-lg shadow-2xl object-contain
            [grid-area:1/1] transition-opacity duration-300 ease-in-out
            opacity-0 dark:opacity-100'
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}
