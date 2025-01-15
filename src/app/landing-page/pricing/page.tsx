'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavHeader } from '@/components/global/nav-header'
import { Footer } from '@/components/global/footer'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

const pricingPlans = [
    {
        name: 'Starter',
        monthlyPrice: 9.99,
        yearlyPrice: 99.99,
        description: 'Perfect for beginners getting started with smart home automation',
        features: ['Up to 5 devices', 'Basic automation', 'Mobile app access', 'Email support', '7-day history']
    },
    {
        name: 'Pro',
        monthlyPrice: 19.99,
        yearlyPrice: 199.99,
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
        monthlyPrice: 39.99,
        yearlyPrice: 399.99,
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
]

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(false)

    const handleToggle = () => {
        setIsYearly(!isYearly)
    }

    return (
        <>
            <NavHeader />
            <div className='fade-in-up'>
                <main className='min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800'>
                    <div className='container mx-auto px-4 py-24'>
                        <div className='text-center mb-16'>
                            <Badge className='mb-4' variant='outline'>
                                Pricing
                            </Badge>
                            <h1 className='text-5xl font-bold mb-6 text-gray-900 dark:text-white'>
                                Simple, Transparent <span className='text-primary'>Pricing</span>
                            </h1>
                            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                                Choose the perfect plan for your smart home needs. All plans include our core features.
                            </p>
                        </div>

                        <div className='flex justify-center items-center gap-4 mb-12'>
                            <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>Monthly</span>
                            <Switch id='billing' checked={isYearly} onCheckedChange={handleToggle} />
                            <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>Yearly</span>
                            <Badge variant='secondary' className='ml-2'>
                                Save 20%
                            </Badge>
                        </div>

                        <div className='grid md:grid-cols-3 gap-8 mb-24'>
                            {pricingPlans.map((plan, index) => (
                                <motion.div
                                    key={plan.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`rounded-3xl p-8 ${
                                        plan.popular
                                            ? 'bg-primary dark:bg-[#085d94] text-white ring-4 ring-primary ring-offset-2'
                                            : 'bg-white dark:bg-gray-800 shadow-lg'
                                    }`}
                                >
                                    {plan.popular && (
                                        <Badge className='bg-white text-primary dark:text-[#085d94] hover:bg-gray-100 mb-4'>
                                            Most Popular
                                        </Badge>
                                    )}
                                    <h3 className='text-2xl font-bold mb-2'>{plan.name}</h3>
                                    <AnimatePresence mode='wait'>
                                        <motion.div
                                            key={isYearly ? 'yearly' : 'monthly'}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ duration: 0.2 }}
                                            className='flex items-baseline gap-2 mb-4'
                                        >
                                            {isYearly && (
                                                <span className='text-2xl line-through opacity-50'>
                                                    ${plan.monthlyPrice.toFixed(2)}
                                                </span>
                                            )}
                                            <span className='text-4xl font-bold'>
                                                $
                                                {isYearly
                                                    ? (plan.yearlyPrice / 12).toFixed(2)
                                                    : plan.monthlyPrice.toFixed(2)}
                                            </span>
                                            <span className='text-sm'>/month</span>
                                        </motion.div>
                                    </AnimatePresence>
                                    <p
                                        className={`text-sm mb-6 ${plan.popular ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'}`}
                                    >
                                        {plan.description}
                                    </p>
                                    <Button
                                        className={`w-full mb-8 ${
                                            plan.popular
                                                ? 'bg-white text-primary dark:text-[#085d94] hover:bg-gray-100'
                                                : 'bg-primary text-white dark:text-black hover:bg-primary/90'
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
                                </motion.div>
                            ))}
                        </div>

                        <div className='max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-12'>
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
