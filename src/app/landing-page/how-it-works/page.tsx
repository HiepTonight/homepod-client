import { NavHeader } from '@/components/global/nav-header'
import { Footer } from '@/components/global/footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function HowItWorksPage() {
    return (
        <>
            <NavHeader />
            <div className='fade-in-up'>
                <main className='bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
                    <div className='container py-24'>
                        {' '}
                        {/* Increased top padding */}
                        <div className='max-w-3xl mx-auto text-center mb-16'>
                            <Badge className='bg-primary/10 text-primary hover:bg-primary/20 mb-4'>How It Works</Badge>
                            <h1 className='text-4xl font-bold mb-6 text-gray-900 dark:text-white'>
                                Simple Steps to Transform Your Home
                            </h1>
                            <p className='text-xl text-gray-600 dark:text-gray-300'>
                                Get started with HomePod in minutes. Our intuitive setup process makes it easy to create
                                your perfect smart home environment.
                            </p>
                        </div>
                        <div className='grid md:grid-cols-3 gap-8 mb-24'>
                            {[
                                {
                                    step: '01',
                                    title: 'Create Account',
                                    description:
                                        'Sign up and complete your profile with basic information about your home.',
                                    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07'
                                },
                                {
                                    step: '02',
                                    title: 'Connect Devices',
                                    description:
                                        'Add your smart devices to the HomePod platform using our simple setup wizard.',
                                    image: 'https://images.unsplash.com/photo-1558002038-1055907df827'
                                },
                                {
                                    step: '03',
                                    title: 'Enjoy Control',
                                    description:
                                        'Access your dashboard to control and automate all your connected devices.',
                                    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15'
                                }
                            ].map((item, index) => (
                                <Card key={index} className='overflow-hidden'>
                                    <div className='relative h-48'>
                                        <img
                                            loading='lazy'
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className='object-cover w-full h-full'
                                        />
                                        <div className='absolute top-4 left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white'>
                                            {item.step}
                                        </div>
                                    </div>
                                    <CardContent className='p-6'>
                                        <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>
                                            {item.title}
                                        </h3>
                                        <p className='text-gray-600 dark:text-gray-300'>{item.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className='max-w-3xl mx-auto mb-24'>
                            <h2 className='text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white'>
                                Frequently Asked Questions
                            </h2>
                            <Accordion type='single' collapsible className='w-full'>
                                {[
                                    {
                                        question: 'What devices are compatible with HomePod?',
                                        answer: "HomePod works with most major smart home brands including Philips Hue, Samsung SmartThings, Nest, Ring, and many others. We're constantly adding support for new devices."
                                    },
                                    {
                                        question: 'Do I need special hardware to use HomePod?',
                                        answer: 'No special hardware is required. HomePod works with your existing smart home devices through their native connectivity options (WiFi, Bluetooth, etc.).'
                                    },
                                    {
                                        question: 'How secure is the HomePod platform?',
                                        answer: 'Security is our top priority. We use bank-level encryption for all data transmission and storage, and regularly undergo security audits to ensure your smart home stays protected.'
                                    },
                                    {
                                        question: 'Can multiple family members use HomePod?',
                                        answer: 'Yes! You can add multiple users to your HomePod account and set different permission levels for each family member.'
                                    },
                                    {
                                        question: 'What happens if my internet goes down?',
                                        answer: 'Your devices will continue to work with their basic functions. Once internet connectivity is restored, all automation and remote control features will resume automatically.'
                                    }
                                ].map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className='text-left text-gray-900 dark:text-white'>
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className='text-gray-600 dark:text-gray-300'>
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                        <div className='bg-primary dark:bg-[#085d94] rounded-3xl p-12 text-center text-white'>
                            <h2 className='text-3xl font-bold mb-6'>Ready to Get Started?</h2>
                            <p className='max-w-2xl mx-auto mb-8'>
                                Transform your home into a smart living space today. Our support team is ready to help
                                you every step of the way.
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
                </main>
            </div>
            <Footer />
        </>
    )
}
