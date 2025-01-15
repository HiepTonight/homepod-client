import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/global/theme-toggle'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SiHomeassistant } from 'react-icons/si'

export function NavHeader() {
    return (
        <header className='fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50'>
            <div className='container flex h-14 items-center justify-between'>
                <Link to='/' className='flex items-center gap-2'>
                    <div className='relative h-6 w-6 rounded-md bg-primary flex items-center justify-center'>
                        <SiHomeassistant className='text-white dark:text-black ' />
                    </div>
                    <span className='text-xl font-semibold text-gray-900 dark:text-white'>HomePod</span>
                </Link>

                <nav className='hidden md:flex items-center gap-8'>
                    <Link
                        to='/'
                        className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    >
                        Home
                    </Link>
                    <Link
                        to='/about'
                        className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    >
                        About Us
                    </Link>
                    <Link
                        to='/how-it-works'
                        className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    >
                        How it Works
                    </Link>
                    <Link
                        to='/pricing'
                        className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    >
                        Pricing
                    </Link>
                    <Link
                        to='/blog'
                        className='text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    >
                        Blog
                    </Link>
                </nav>

                <div className='flex items-center gap-4'>
                    <ThemeToggle className={'text-gray-500'} dark={''} />
                    <a href='/dashboard'>
                        <Button className='bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 transition-all duration-300'>
                            Get Started
                            <ArrowRight className='' />
                        </Button>
                    </a>
                </div>
            </div>
        </header>
    )
}
