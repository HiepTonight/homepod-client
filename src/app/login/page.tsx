import { GalleryVerticalEnd, HousePlug } from 'lucide-react'
import { SiHomeassistant } from 'react-icons/si'
import { SignupForm } from '@/components/signup-form'
import { LoginForm } from '@/components/login-form'
import { useState } from 'react'

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)

    const handleToggle = () => {
        setIsLogin(!isLogin)
    }

    return (
        <div className='grid min-h-svh lg:grid-cols-2'>
            <div className='flex flex-col gap-4 p-6 md:p-10'>
                <div className='flex justify-center gap-2 md:justify-start'>
                    <a href='#' className='flex items-center gap-2 font-medium'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
                            <SiHomeassistant className='size-4' />
                        </div>
                        SMH Inc.
                    </a>
                </div>
                <div className='flex flex-1 items-center justify-center overflow-hidden'>
                    <div className='relative w-full max-w-xs'>
                        <div
                            className={`transition-all duration-500 ${
                                isLogin ? 'translate-x-0 opacity-100' : 'absolute top-0 -translate-x-full opacity-0'
                            }`}
                        >
                            <LoginForm handleSignupToggle={handleToggle} isActive={isLogin} />
                        </div>

                        <div
                            className={`transition-all duration-500 ${
                                !isLogin ? 'translate-x-0 opacity-100' : 'absolute top-0 translate-x-full opacity-0'
                            }`}
                        >
                            <SignupForm handleLoginToggle={handleToggle} isActive={!isLogin} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative hidden bg-muted lg:block'>
                <img
                    src='https://images.pexels.com/photos/15838266/pexels-photo-15838266.jpeg'
                    alt='Image'
                    className='absolute inset-0 h-full w-full object-cover'
                />
            </div>
        </div>
    )
}
