import { NavHeader } from '@/components/global/nav-header'
import { Footer } from '@/components/global/footer'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

export default function PricingPage() {
    return (
        <>
            <NavHeader />
            <div className='fade-in-up'>
                <main className='bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
                    <div className='container py-24'>
                        {' '}
                        {/* Increased top padding */}
                        <div className='max-w-3xl mx-auto text-center mb-16'>
                            <Badge className='bg-primary/10 text-primary hover:bg-primary/20 mb-4'>Pricing</Badge>
                            <h1 className='text-4xl font-bold mb-6 text-gray-900 dark:text-white'>
                                Simple, Transparent Pricing
                            </h1>
                            <p className='text-xl text-gray-600 dark:text-gray-300'>
                                Choose the perfect plan for your smart home needs. All plans include our core features.
                            </p>
                        </div>
                        <div className='flex justify-center items-center gap-4 mb-12'>
                            <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>Monthly</span>
                            <Switch id='billing' />
                            <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>Yearly</span>
                            <Badge variant='secondary' className='ml-2'>
                                Save 20%
                            </Badge>
                        </div>
                        <div className='grid md:grid-cols-3 gap-8 mb-24'>
                            {[
                                {
                                    name: 'Starter',
                                    price: '9.99',
                                    description: 'Perfect for beginners getting started with smart home automation',
                                    features: [
                                        'Up to 5 devices',
                                        'Basic automation',
                                        'Mobile app access',
                                        'Email support',
                                        '7-day history'
                                    ]
                                },
                                {
                                    name: 'Pro',
                                    price: '19.99',
                                    description: 'Ideal for homes with multiple smart devices and users',
                                    features: [
                                        'Up to 15 devices',
                                        'Advanced automation',
                                        'Multiple users',
                                        'Priority support',
                                        '30-day history',
                                        'Custom scenes',
                                        'Energy monitoring'
                                    ],
                                    popular: true
                                },
                                {
                                    name: 'Enterprise',
                                    price: '39.99',
                                    description: 'For large homes and professional installations',
                                    features: [
                                        'Unlimited devices',
                                        'Professional automation',
                                        'Unlimited users',
                                        '24/7 premium support',
                                        '90-day history',
                                        'Custom API access',
                                        'Advanced analytics',
                                        'Custom integration'
                                    ]
                                }
                            ].map((plan, index) => (
                                <div
                                    key={index}
                                    className={`rounded-3xl p-8 ${
                                        plan.popular
                                            ? 'bg-primary dark:bg-[#085d94] text-white ring-4 ring-primary ring-offset-2'
                                            : 'bg-white dark:bg-gray-800 shadow-lg'
                                    }`}
                                >
                                    {plan.popular && (
                                        <Badge className='bg-white text-primary hover:bg-gray-100 mb-4'>
                                            Most Popular
                                        </Badge>
                                    )}
                                    <h3 className='text-2xl font-bold mb-2'>{plan.name}</h3>
                                    <div className='flex items-baseline gap-1 mb-4'>
                                        <span className='text-4xl font-bold'>${plan.price}</span>
                                        <span className='text-sm'>/month</span>
                                    </div>
                                    <p
                                        className={`text-sm mb-6 ${plan.popular ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'}`}
                                    >
                                        {plan.description}
                                    </p>
                                    <Button
                                        className={`w-full mb-8 ${
                                            plan.popular
                                                ? 'bg-white text-primary hover:bg-gray-100'
                                                : 'bg-primary text-white hover:bg-primary/90'
                                        }`}
                                    >
                                        Get Started
                                    </Button>
                                    <div className='space-y-4'>
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className='flex items-center gap-2'>
                                                <Check className='h-4 w-4 flex-shrink-0' />
                                                <span className='text-sm'>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-3xl p-12'>
                            <h2 className='text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white'>
                                Enterprise Solutions
                            </h2>
                            <div className='grid md:grid-cols-2 gap-8'>
                                <div>
                                    <h3 className='font-semibold mb-4 text-gray-900 dark:text-white'>
                                        Custom Integration
                                    </h3>
                                    <p className='text-gray-600 dark:text-gray-300 text-sm mb-4'>
                                        Need a custom solution? We offer tailored packages for businesses and
                                        large-scale deployments.
                                    </p>
                                    <Button variant='outline'>Contact Sales</Button>
                                </div>
                                <div className='space-y-4'>
                                    <div className='flex items-center gap-2'>
                                        <Check className='h-4 w-4 text-primary' />
                                        <span className='text-sm text-gray-600 dark:text-gray-300'>
                                            Custom development
                                        </span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Check className='h-4 w-4 text-primary' />
                                        <span className='text-sm text-gray-600 dark:text-gray-300'>
                                            Dedicated support team
                                        </span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Check className='h-4 w-4 text-primary' />
                                        <span className='text-sm text-gray-600 dark:text-gray-300'>SLA guarantees</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Check className='h-4 w-4 text-primary' />
                                        <span className='text-sm text-gray-600 dark:text-gray-300'>
                                            Custom training
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}
