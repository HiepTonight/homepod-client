import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function DashboardPreview() {
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
                <div className='relative mx-auto max-w-5xl'>
                    {/* Gradient border effect */}
                    <div className='absolute -inset-1 bg-gradient-to-r from-rose-500 via-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-40' />

                    {/* Window chrome */}
                    <Card className='relative bg-black/90 backdrop-blur-xl rounded-xl overflow-hidden border-0 shadow-2xl'>
                        {/* Window controls */}
                        <div className='flex items-center gap-2 p-4 border-b border-white/10'>
                            <div className='flex gap-2'>
                                <div className='w-3 h-3 rounded-full bg-rose-500' />
                                <div className='w-3 h-3 rounded-full bg-yellow-500' />
                                <div className='w-3 h-3 rounded-full bg-green-500' />
                            </div>
                        </div>

                        {/* Dashboard content */}
                        <div className='p-6'>
                            <img
                                // loading='lazy'
                                src='./dashboard1.png'
                                alt='Dashboard interface'
                                width={800}
                                height={600}
                                className='w-full h-auto rounded-lg shadow-2xl object-contain object-center transition-transform duration-300'
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}
