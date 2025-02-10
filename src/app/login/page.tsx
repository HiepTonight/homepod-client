import { GalleryVerticalEnd, HousePlug } from 'lucide-react'
import { SiHomeassistant } from 'react-icons/si'
import { Button } from '@/components/ui/button'
import { SignupForm } from '@/components/signup-form'
import { LoginForm } from '@/components/login-form'
import { useAuth } from '@/context/AuthProvider'
import { googleSignInCallback } from '@/apis/Auth/AuthService'

import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { set } from 'date-fns'
import { toast } from 'sonner'
import { waitFor } from '@/lib/waitFor'

export default function LoginPage() {
    const navigate = useNavigate()
    const { handleLogin, setUserInfo } = useAuth()
    const [googleCallback, setGoogleCallback] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const code = searchParams.get('code')
        const state = searchParams.get('state')

        if (!code && !state) {
            const showNoti = async () => {
                try {
                    toast.error('Signin with Github is now under maintained !', {
                        description: 'Choose another method to signin'
                    })
                    await waitFor(3000)

                    toast.success('You can use admin account for testing', {
                        description: 'Use the following credentials: Username: hieptran Password: 123456'
                    })
                } catch (error) {
                    console.error('Error:', error)
                }
            }
            showNoti()
        }
    }, [searchParams])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        // setGoogleCallback(state)
        if (code && state) {
            const handleGoogleCallback = async () => {
                try {
                    setLoading(true)

                    const response = await googleSignInCallback(code)
                    console.log('response', response)
                    const { userInfo, accessToken, refreshToken } = response

                    handleLogin(accessToken, refreshToken)
                    setUserInfo(userInfo)
                    navigate('/dashboard')
                } catch (error) {
                    console.error('Error handling Google callback:', error)
                    navigate('/login')
                } finally {
                    setLoading(false)
                }
            }
            handleGoogleCallback()
        }
    }, [navigate, searchParams])

    const handleShowNoti = async () => {
        try {
            toast.error('Signin with Github is now under maintained !', {
                description: 'Choose another method to signin'
            })
            await waitFor(3000)

            toast.success('You can use admin account for testing', {
                description: 'Use the following credentials: Username: hieptran Password: 123456'
            })
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleToggle = () => {
        setIsLogin(!isLogin)
    }

    return (
        <div className='grid min-h-svh lg:grid-cols-2'>
            <div className='flex flex-col gap-4 p-6 md:p-10'>
                <div className='flex justify-center gap-2 md:justify-start'>
                    <Link to={'/'} className='flex items-center gap-2 font-medium'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
                            <SiHomeassistant className='size-4' />
                        </div>
                        SMH Inc.
                    </Link>
                </div>
                <div className='flex flex-1 items-center justify-center overflow-hidden'>
                    <div className='relative w-full max-w-xs'>
                        <div
                            className={`transition-all duration-500 ${
                                isLogin ? 'translate-x-0 opacity-100' : 'absolute top-0 -translate-x-full opacity-0'
                            }`}
                        >
                            <LoginForm
                                handleSignupToggle={handleToggle}
                                isActive={isLogin}
                                loading={loading}
                                setLoading={setLoading}
                            />
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
                <div className='flex justify-start'>
                    <Button
                        variant='outline'
                        className='rounded-full bg-secondary hover:bg-background/90'
                        onClick={handleShowNoti}
                    >
                        ?
                    </Button>
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
