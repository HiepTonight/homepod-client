import { NavHeader } from '@/components/global/nav-header'
import { Footer } from '@/components/global/footer'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Award, Target, Building2 } from 'lucide-react'

export default function AboutPage() {
    return (
        <>
            <NavHeader />
            <div className='fade-in-up'>
                <main className='bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
                    <div className='container py-24'>
                        {' '}
                        {/* Increased top padding */}
                        <div className='max-w-3xl mx-auto text-center mb-16'>
                            <Badge className='bg-primary/10 text-primary hover:bg-primary/20 mb-4'>About Us</Badge>
                            <h1 className='text-4xl font-bold mb-6 text-gray-900 dark:text-white'>
                                Revolutionizing Smart Living Through Innovation
                            </h1>
                            <p className='text-xl text-gray-600 dark:text-gray-300'>
                                We're on a mission to transform everyday homes into intelligent living spaces that
                                enhance comfort, security, and efficiency.
                            </p>
                        </div>
                        <div className='grid md:grid-cols-2 gap-12 items-center mb-24'>
                            <div>
                                <img
                                    loading='lazy'
                                    src='https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
                                    alt='Modern smart home office'
                                    width={600}
                                    height={400}
                                    className='rounded-3xl'
                                />
                            </div>
                            <div className='space-y-6'>
                                <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>Our Story</h2>
                                <p className='text-gray-600 dark:text-gray-300'>
                                    Founded in 2020, Voltex emerged from a simple yet powerful idea: making smart home
                                    technology accessible to everyone. Our team of innovators and engineers worked
                                    tirelessly to develop an intuitive platform that seamlessly connects and controls
                                    all your smart devices.
                                </p>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='p-4 bg-primary/10 rounded-xl'>
                                        <div className='font-bold text-3xl text-primary mb-1'>50K+</div>
                                        <div className='text-sm text-gray-600 dark:text-gray-300'>Happy Customers</div>
                                    </div>
                                    <div className='p-4 bg-primary/10 rounded-xl'>
                                        <div className='font-bold text-3xl text-primary mb-1'>95%</div>
                                        <div className='text-sm text-gray-600 dark:text-gray-300'>
                                            Satisfaction Rate
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24'>
                            {[
                                {
                                    icon: Users,
                                    title: 'Customer First',
                                    description: "We prioritize our customers' needs and satisfaction above all else."
                                },
                                {
                                    icon: Award,
                                    title: 'Excellence',
                                    description: 'We strive for excellence in every product and service we deliver.'
                                },
                                {
                                    icon: Target,
                                    title: 'Innovation',
                                    description: 'We continuously innovate to stay ahead of technological advances.'
                                },
                                {
                                    icon: Building2,
                                    title: 'Reliability',
                                    description: 'Our systems are built to be reliable and secure at all times.'
                                }
                            ].map((value, index) => (
                                <div
                                    key={index}
                                    className='text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg'
                                >
                                    <div className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4'>
                                        <value.icon className='h-6 w-6' />
                                    </div>
                                    <h3 className='font-semibold mb-2 text-gray-900 dark:text-white'>{value.title}</h3>
                                    <p className='text-gray-600 dark:text-gray-300 text-sm'>{value.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className='bg-primary rounded-3xl p-12 text-center text-white'>
                            <h2 className='text-3xl font-bold mb-6'>Join Our Team</h2>
                            <p className='max-w-2xl mx-auto mb-8'>
                                We're always looking for talented individuals who share our passion for innovation and
                                smart home technology.
                            </p>
                            <Button variant='secondary' size='lg' className='rounded-full'>
                                View Open Positions
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}
