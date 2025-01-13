import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export function ExploreMore() {
    return (
        <section className='py-16'>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white'>Explore More</h2>
                <div className='grid md:grid-cols-3 gap-8'>
                    <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center'>
                        <h3 className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'>About Us</h3>
                        <p className='text-gray-600 dark:text-gray-300 mb-6'>
                            Learn about our mission and the team behind Voltex.
                        </p>
                        <Link to='/about'>
                            <Button variant='outline'>Discover Our Story</Button>
                        </Link>
                    </div>
                    <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center'>
                        <h3 className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'>How It Works</h3>
                        <p className='text-gray-600 dark:text-gray-300 mb-6'>
                            See how easy it is to set up and use Voltex in your home.
                        </p>
                        <Link to='/how-it-works'>
                            <Button variant='outline'>See the Process</Button>
                        </Link>
                    </div>
                    <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center'>
                        <h3 className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'>Pricing</h3>
                        <p className='text-gray-600 dark:text-gray-300 mb-6'>
                            Find the perfect plan for your smart home needs.
                        </p>
                        <Link to='/pricing'>
                            <Button variant='outline'>View Plans</Button>
                        </Link>
                    </div>
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
