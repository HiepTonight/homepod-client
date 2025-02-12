'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '@/context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { isUsernameExist, isEmailExist, signUp, otpVerify } from '@/apis/Auth/AuthService'

export function SignupForm({
    className,
    handleLoginToggle,
    isActive,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const { handleLogin, setUserInfo } = useAuth()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        otp: ''
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const handleOTPChange = (value: string) => {
        setFormData((prev) => ({ ...prev, otp: value }))
        if (errors.otp) {
            setErrors((prev) => ({ ...prev, otp: '' }))
        }
    }

    const validateStep = async () => {
        const newErrors: { [key: string]: string } = {}

        switch (step) {
            case 1:
                if (formData.username.length < 3) {
                    newErrors.username = 'Username must be at least 3 characters long'
                } else {
                    try {
                        const notValid = await isUsernameExist(formData.username)
                        if (notValid) {
                            newErrors.username = 'Username already exists'
                        }
                    } catch (error) {
                        console.error('Error checking username:', error)
                        newErrors.username = 'An error occurred. Please try again.'
                    }
                }
                break
            case 2:
                if (!/\S+@\S+\.\S+/.test(formData.email)) {
                    newErrors.email = 'Please enter a valid email address'
                } else {
                    try {
                        const notValid = await isEmailExist(formData.email)
                        if (notValid) {
                            newErrors.email = 'Email already exists'
                        }
                    } catch (error) {
                        console.error('Error checking email:', error)
                        newErrors.email = 'An error occurred. Please try again.'
                    }
                }
                break
            case 3:
                if (formData.password.length < 8) {
                    newErrors.password = 'Password must be at least 8 characters long'
                }
                if (formData.password !== formData.confirmPassword) {
                    newErrors.confirmPassword = 'Passwords do not match'
                }
                break
            case 4:
                if (formData.otp.length !== 6) {
                    newErrors.otp = 'Please enter a valid 6-digit OTP was sent to your email'
                }
                break
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = async () => {
        if (await validateStep()) {
            if (step === 3) {
                await handleCreateAccountAndSendOtp()
            }
            if (step < 4) {
                setStep((prev) => prev + 1)
            }
        }
    }

    const handleBack = () => {
        if (step > 1) setStep((prev) => prev - 1)
    }

    const handleCreateAccountAndSendOtp = async () => {
        setIsLoading(true)
        try {
            const { username, email, password, confirmPassword } = formData
            signUp({ username, email, password, confirmPassword })
            // console.log('Account created:', response)
            // Handle successful account creation and OTP sending
        } catch (error) {
            console.error('Error creating account and sending OTP:', error)
            setErrors({ submit: 'An error occurred during account creation. Please try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (await validateStep()) {
            setIsLoading(true)
            try {
                if (step === 4) {
                    const { email, otp } = formData
                    const response = await otpVerify({ email, otp })
                    console.log('OTP verified:', response)

                    const { userInfo, accessToken, refreshToken } = response
                    handleLogin(accessToken, refreshToken , userInfo)
                    setUserInfo(userInfo)
                    navigate('/dashboard')
                } 
            } catch (error) {
                console.error('Signup error:', error)
                setErrors({ submit: 'An error occurred during signup. Please try again.' })
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handleOAuthSignIn = async (provider: 'google' | 'github') => {
        setIsLoading(true)
        try {
            await signIn(provider, { callbackUrl: '/dashboard' })
        } catch (error) {
            console.error(`${provider} sign-in error:`, error)
            setErrors({ oauth: `An error occurred during ${provider} sign-in. Please try again.` })
        } finally {
            setIsLoading(false)
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className='grid gap-2'>
                        <Label htmlFor='username'>Username</Label>
                        <Input
                            id='username'
                            name='username'
                            type='text'
                            placeholder='johndoe'
                            value={formData.username}
                            onChange={handleChange}
                            required
                            disabled={!isActive || isLoading}
                        />
                        {errors.username && <ErrorMessage message={errors.username} />}
                    </div>
                )
            case 2:
                return (
                    <div className='grid gap-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='john@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={!isActive || isLoading}
                        />
                        {errors.email && <ErrorMessage message={errors.email} />}
                    </div>
                )
            case 3:
                return (
                    <div className='grid gap-2'>
                        <Label htmlFor='password'>Password</Label>
                        <div className='relative'>
                            <Input
                                id='password'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={!isActive || isLoading}
                            />
                            <button
                                type='button'
                                className='absolute inset-y-0 right-0 flex items-center px-2'
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        <Label htmlFor='confirmPassword'>Confirm password</Label>
                        <div className='relative'>
                            <Input
                                id='confirmPassword'
                                name='confirmPassword'
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                disabled={!isActive || isLoading}
                            />
                            <button
                                type='button'
                                className='absolute inset-y-0 right-0 flex items-center px-2'
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        {errors.password && <ErrorMessage message={errors.password} />}
                        {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword} />}
                    </div>
                )
            case 4:
                return (
                    <div className='flex flex-col items-center gap-2 justify-center'>
                        <Label htmlFor='otp mb-4'>Enter OTP</Label>
                        <InputOTP
                            maxLength={6}
                            value={formData.otp}
                            onChange={handleOTPChange}
                            disabled={!isActive}
                            className='gap-2'
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        {errors.otp && <ErrorMessage message={errors.otp} />}
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>Create an account</h1>
                <p className='text-balance text-sm text-muted-foreground'>
                    Step {step} of 4: {step === 1 ? 'Username' : step === 2 ? 'Email' : step === 3 ? 'Password' : 'OTP'}
                </p>
            </div>
            <Progress value={(step / 4) * 100} className='w-full' />
            <form onSubmit={handleSubmit} className='grid gap-6'>
                {renderStep()}
                <div className='flex justify-between'>
                    {step > 1 && (
                        <Button type='button' variant='outline' onClick={handleBack} disabled={!isActive || isLoading}>
                            Back
                        </Button>
                    )}
                    {step < 4 ? (
                        <Button
                            type='button'
                            onClick={handleNext}
                            disabled={!isActive || isLoading}
                            className='ml-auto'
                        >
                            Next
                        </Button>
                    ) : (
                        <Button type='submit' disabled={!isActive || isLoading} className='ml-auto'>
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    )}
                </div>
            </form>
            {errors.submit && <ErrorMessage message={errors.submit} />}
            <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or continue with</span>
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <Button
                    variant='outline'
                    className='w-full'
                    disabled={!isActive || isLoading}
                    onClick={() => handleOAuthSignIn('github')}
                >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='mr-2 h-4 w-4'>
                        <path
                            d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
                            fill='currentColor'
                        />
                    </svg>
                    GitHub
                </Button>
                <Button
                    variant='outline'
                    className='w-full'
                    disabled={!isActive || isLoading}
                    onClick={() => handleOAuthSignIn('google')}
                >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='mr-2 h-4 w-4'>
                        <path
                            d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                            fill='currentColor'
                        />
                    </svg>
                    Google
                </Button>
            </div>
            {errors.oauth && <ErrorMessage message={errors.oauth} />}
            <div className='text-center text-sm'>
                Already have an account?{' '}
                <a
                    className='font-medium underline-offset-4 cursor-pointer transition-colors duration-300 hover:text-blue-400'
                    onClick={handleLoginToggle}
                >
                    Log in
                </a>
            </div>
        </div>
    )
}

function ErrorMessage({ message }: { message: string }) {
    return (
        <Alert variant='destructive' className='mt-2'>
            <AlertCircle className='h-4 w-4' />
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}