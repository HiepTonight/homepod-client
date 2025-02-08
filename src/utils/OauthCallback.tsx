import React, { Suspense, useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { googleSignInCallback } from '@/apis/Auth/AuthService'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/context/AuthProvider'

const OauthCallBack = () => {
    const navigate = useNavigate()
    const { handleLogin, setUserInfo } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleGoogleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search)
            const code = urlParams.get('code')
            if (code) {
                try {
                    debugger
                    const response = await googleSignInCallback(code)
                    console.log('response', response)
                    const { userInfo, accessToken, refreshToken } = response.data

                    handleLogin(accessToken, refreshToken)
                    setUserInfo(userInfo)
                    navigate('/dashboard')
                } catch (error) {
                    console.error('Error handling Google callback:', error)
                    navigate('/login')
                } finally {
                    setLoading(false)
                }
            } else {
                navigate('/login')
            }
        }

        handleGoogleCallback()
    }, [navigate])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Skeleton className="w-48 h-48" />
            </div>
        )
    }

    return <Outlet />
}

const OauthCallBackWrapper = () => (
    <Suspense fallback={<Skeleton className="w-48 h-48" />}>
        <OauthCallBack />
    </Suspense>
)

export default OauthCallBackWrapper