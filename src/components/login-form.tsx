import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { toast } from 'sonner'
import { AlertCircle, Loader, Github } from 'lucide-react'
import { signIn, getUserInfo } from '@/apis/Auth/AuthService'
import { useAuth } from '@/context/AuthProvider'
import login from '@/apis/Auth/login'

export function LoginForm({ className, handleSignupToggle, ...props }: React.ComponentPropsWithoutRef<'form'>) {
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

                navigate('/dashboard')
            } else {
                setError('Invalid username or password')
            }
        } catch (error) {
            setError('Invalid username or password')
            toast('Device have been created', {
                description: 'Your device have been successfully created.',
                action: {
                    label: 'Undo',
                    onClick: () => console.log('Undo')
                }
            })
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
            {error && (
                <Alert variant='destructive'>
                    <AlertCircle className='h-4 w-4' />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
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
            <div className='grid grid-cols-2 gap-2'>
                <Button variant='outline' className='w-full'>
                    {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                        <path fill='currentColor' />
                    </svg> */}
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                        <path
                            d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
                            fill='currentColor'
                        />
                    </svg>
                    GitHub
                </Button>
                <Button variant='outline' className='w-full'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                        <path
                            d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                            fill='currentColor'
                        />
                    </svg>
                    Google
                </Button>
            </div>

            <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <a className='font-medium cursor-pointer transition-colors duration-300 hover:text-blue-400' onClick={handleSignupToggle}>
                    Sign up
                </a>
            </div>
        </form>
    )
}
