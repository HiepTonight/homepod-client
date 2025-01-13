import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { SiHomeassistant } from 'react-icons/si'

import { Button } from '@/components/ui/button'

export function Footer() {
    return (
        <footer className='bg-muted'>
            <div className='container py-12'>
                <div className='grid grid-cols-2 md:grid-cols-5 gap-8'>
                    <div className='col-span-2'>
                        <div className='flex items-center gap-2 mb-4'>
                            <div className='relative h-6 w-6 rounded-md bg-primary flex items-center justify-center'>
                                <SiHomeassistant className='text-white dark:text-black ' />
                            </div>{' '}
                            <span className='text-xl font-semibold'>HomePod</span>
                        </div>
                        <p className='mb-4 text-muted-foreground'>
                            Transform your living space with our innovative smart home solutions.
                        </p>
                        <div className='flex gap-4'>
                            <Facebook className='w-5 h-5 text-muted-foreground hover:text-foreground transition-colors' />
                            <Twitter className='w-5 h-5 text-muted-foreground hover:text-foreground transition-colors' />
                            <Instagram className='w-5 h-5 text-muted-foreground hover:text-foreground transition-colors' />
                            <Youtube className='w-5 h-5 text-muted-foreground hover:text-foreground transition-colors' />
                        </div>
                    </div>
                    <div>
                        <h4 className='font-semibold mb-4'>Company</h4>
                        <ul className='space-y-2 text-muted-foreground'>
                            <li>About Us</li>
                            <li>How it Works</li>
                            <li>Pricing</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className='font-semibold mb-4'>Features</h4>
                        <ul className='space-y-2 text-muted-foreground'>
                            <li>Device Control</li>
                            <li>Energy Management</li>
                            <li>Security</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className='font-semibold mb-4'>Support</h4>
                        <ul className='space-y-2 text-muted-foreground'>
                            <li>Help Center</li>
                            <li>Contact Us</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='border-t border-muted-foreground/20'>
                <div className='container py-6 flex flex-col md:flex-row justify-between items-center gap-4'>
                    <p className='text-muted-foreground'>© 2024 HomePod. All rights reserved.</p>
                    <div className='flex gap-4'>
                        <Button variant='link' className='text-muted-foreground hover:text-foreground'>
                            Terms of Service
                        </Button>
                        <Button variant='link' className='text-muted-foreground hover:text-foreground'>
                            Privacy Policy
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
