import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn, getUserInfo } from '@/apis/Auth/AuthService'
import { useAuth } from '@/context/AuthProvider'
import login from '@/apis/Auth/login'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { setUserInfo, handleLogin } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await login(credentials)

            if (response.data && response.data.accessToken) {
                // localStorage.setItem('token', response.data.accessToken)
                const { userInfo, accessToken, refreshToken } = response.data

                handleLogin(accessToken, refreshToken)

                // localStorage.setItem('token', accessToken)

                // localStorage.setItem('refreshToken', refreshToken)

                setUserInfo(userInfo)

                navigate('/')
            } else {
                setError('Invalid username or password')
            }
        } catch (error) {
            setError('Invalid username or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={handleSubmit}>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>Login to your account</h1>
                <p className='text-balance text-sm text-muted-foreground'>
                    Enter your email below to login to your account
                </p>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <div className='grid gap-6'>
                <div className='grid gap-2'>
                    <Label htmlFor='identifier'>Email or Username</Label>
                    <Input
                        id='username'
                        name='username'
                        type='text'
                        placeholder='Email or Username'
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='grid gap-2'>
                    <div className='flex items-center'>
                        <Label htmlFor='password'>Password</Label>
                        <a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
                            Forgot your password?
                        </a>
                    </div>
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <Button type='submit' className='w-full flex items-center justify-center' disabled={loading}>
                {loading && (
                    <svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24'>
                        <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                        ></circle>
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8H4z'></path>
                    </svg>
                )}
                Login
            </Button>
            <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or continue with</span>
            </div>
            <Button variant='outline' className='w-full'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path fill='currentColor' />
                </svg>
                Login with GitHub
            </Button>
            <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <a href='#' className='underline underline-offset-4'>
                    Sign up
                </a>
            </div>
        </form>
    )
}
