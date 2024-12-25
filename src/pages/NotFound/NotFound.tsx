import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <div
                className='flex flex-col justify-center min-h-screen items-center bg-white px-6 lg:px-8 bg-fixed bg-center'
                style={{
                    backgroundImage:
                        'url(https://images.pexels.com/photos/2251206/pexels-photo-2251206.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1)'
                }}
            >
                <div className='text-center'>
                    <p className=' font-semibold text-white text-6xl'>404</p>
                    <h1 className='mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-300 sm:text-7xl'>
                        Page not found
                    </h1>
                    <p className='mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8'>
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className='mt-10 flex items-center justify-center gap-x-6'>
                        <Link
                            to='/'
                            className='rounded-md bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Go back home
                        </Link>
                        <a href='/contact-support' className='text-sm font-semibold text-white'>
                            Contact support <span aria-hidden='true'>&rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
