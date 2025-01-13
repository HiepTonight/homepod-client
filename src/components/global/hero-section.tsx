import { Button } from '@/components/ui/button'
import { ThermometerSnowflake } from 'lucide-react';

export function HeroSection() {
    return (
        <section className='pt-32 pb-24'>
            <div className='container'>
                <div className='grid lg:grid-cols-2 gap-16 items-center'>
                    <div className='space-y-8'>
                        <h1 className='text-5xl font-bold leading-tight lg:leading-[1.2] xl:text-6xl'>
                            Dive Into The World of Smart Home Automation
                        </h1>

                        <p className='text-lg text-muted-foreground'>
                            Discover the perfect synergy of innovation and comfort as your home effortlessly adjusts to
                            meet your needs, providing a living environment that's personalized to your unique lifestyle
                            and preferences.
                        </p>

                        <div className='flex flex-col sm:flex-row gap-4'>
                            <Button size='lg' className='bg-primary hover:bg-primary/90'>
                                Get Started
                            </Button>
                            <Button size='lg' variant='outline'>
                                Learn More
                            </Button>
                        </div>
                    </div>

                    <div className='grid gap-6 lg:grid-cols-2'>
                        <div className='relative group rounded-3xl overflow-hidden'>
                            <img
                                loading='lazy'
                                src='https://images.unsplash.com/photo-1558002038-1055907df827'
                                alt='Smart home living room'
                                width={400}
                                height={300}
                                className='w-full h-full object-cover transition-transform group-hover:scale-110 duration-300'
                            />
                            <div className='absolute inset-0 bg-black/60 flex items-end p-6 transition-opacity group-hover:opacity-100 opacity-0'>
                                <div className='text-white'>
                                    <h3 className='font-semibold mb-2'>Smart Lighting</h3>
                                    <p className='text-sm'>Control your home's ambiance with ease</p>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-6'>
                            <div className='bg-card rounded-3xl p-6 shadow-lg'>
                                <div className='flex items-center justify-between mb-4'>
                                    <div>
                                        <h3 className='font-medium'>Smart Thermostat</h3>
                                        <p className='text-sm text-muted-foreground'>Eco-friendly</p>
                                    </div>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='text-primary-foreground bg-[#085d94] dark:bg-slate-800 hover:bg-[#4aa7de] dark:hover:bg-slate-500 hover:text-primary-foreground/90'
                                    >
                                        <ThermometerSnowflake className='dark:text-white'/>
                                    </Button>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='relative w-12 h-6 bg-primary rounded-full'>
                                        <div className='absolute right-1 top-1 w-4 h-4 bg-white rounded-full' />
                                    </div>
                                    <span className='text-sm text-muted-foreground'>22°C</span>
                                </div>
                            </div>

                            <div className='bg-primary rounded-3xl p-6 text-primary-foreground'>
                                <div className='flex justify-between items-start mb-4'>
                                    <h3 className='text-xl font-semibold'>Security Guarantee</h3>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='text-primary-foreground hover:bg-[#4aa7de] hover:text-primary-foreground/90'
                                    >
                                        <svg viewBox='0 0 24 24' className='w-5 h-5' fill='none' stroke='currentColor'>
                                            <path
                                                d='M7 17L17 7M17 7H7M17 7V17'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </Button>
                                </div>
                                <p className='text-sm opacity-90'>
                                    Your security is our top priority. We always protect your home, your family, and
                                    your privacy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
