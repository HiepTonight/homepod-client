import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
// import { ArrowRight, Users, BookOpen, CreditCard } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Users, BookOpen, CreditCard } from 'lucide-react'

export function ExploreMore() {
    return (
        <section className='py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-16'>
                    <Badge className='mb-4' variant='outline'>
                        Explore More
                    </Badge>
                    <h2 className='text-4xl font-bold mb-6 text-gray-900 dark:text-white'>
                        Discover the <span className='text-primary'>HomePod</span> Ecosystem
                    </h2>
                    <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                        Learn more about our company, how our technology works, and find the perfect plan for your smart
                        home needs.
                    </p>
                </div>
                <div className='grid md:grid-cols-3 gap-8'>
                    {[
                        {
                            title: 'About Us',
                            description: 'Learn about our mission and the team behind HomePod.',
                            icon: Users,
                            link: '/about',
                            buttonText: 'Discover Our Story'
                        },
                        {
                            title: 'How It Works',
                            description: 'See how easy it is to set up and use HomePod in your home.',
                            icon: BookOpen,
                            link: '/how-it-works',
                            buttonText: 'See the Process'
                        },
                        {
                            title: 'Pricing',
                            description: 'Find the perfect plan for your smart home needs.',
                            icon: CreditCard,
                            link: '/pricing',
                            buttonText: 'View Plans'
                        }
                    ].map((item, index) => (
                        <Card key={index} className='group hover:shadow-lg transition-all duration-300'>
                            <CardHeader>
                                <div className='mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                                    <item.icon className='w-6 h-6' />
                                </div>
                                <CardTitle className='text-2xl mb-2'>{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-muted-foreground mb-6'>{item.description}</p>
                                <Link href={item.link} passHref>
                                    <Button
                                        variant='outline'
                                        className='w-full group-hover:bg-primary group-hover:text-white transition-all duration-300'
                                    >
                                        {item.buttonText}
                                        <ArrowRight className='ml-2 w-4 h-4 transition-transform group-hover:translate-x-1' />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className='mt-12 bg-primary dark:bg-[#085d94] rounded-3xl p-12 text-center text-white'>
                    <h2 className='text-3xl font-bold mb-6'>Ready to Get Started?</h2>
                    <p className='max-w-2xl mx-auto mb-8'>
                        Transform your home into a smart living space today. Our support team is ready to help you every
                        step of the way.
                    </p>
                    <div className='inline-flex gap-4'>
                        <a
                            href='#'
                            className='inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-primary dark:text-[#085d94] shadow transition-colors hover:bg-gray-100'
                        >
                            Get Started
                        </a>
                        <a
                            href='#'
                            className='inline-flex h-11 items-center justify-center rounded-full px-8 text-sm font-medium text-white ring-1 ring-white/30 transition-colors hover:bg-white/10'
                        >
                            Contact Sales
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
