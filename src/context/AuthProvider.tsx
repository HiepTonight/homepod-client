import { React, useContext, useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
// import Cookies from 'js-cookie'
import { getUserInfo } from '@/apis/Auth/AuthService'

export const AuthContext = createContext({})

export enum AuthActionType {
    INITIALIZE = 'INITIALIZE',
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT',
}

export interface PayloadAction<T> {
    type: AuthActionType
    payload: T
}

export interface AuthContextType {

}

// const initialState: AuthState = {
//     isAuthenticated: false,
//     isInitialized: false,
//     user: null,
// }

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)
    // const [userId, setUserId] = useState(Cookies.get('userId'))
    const [userId, setUserId] = useState(localStorage.getItem('userId'))

    const handleLogin = (accessToken, refreshToken) => {
        localStorage.setItem('token', accessToken)

        localStorage.setItem('refreshToken', refreshToken)
    }

    const isAuthenticated = () => {
        console.log('isAuthenticated', !!localStorage.getItem('token'))
        return !!localStorage.getItem('token')
    }

    const handleLogOut = () => {
        // Cookies.remove('token');
        // Cookies.remove('refreshToken');
        // Cookies.remove('userId');

        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userId')

        setUserInfo(null)
        window.location.reload
        window.location.href = '/login'
    }

    // console.log('userInfo', userInfo)

    useEffect(() => {
        // call api info
        if (localStorage.getItem('token')) {
            getUserInfo()
                .then((res) => {
                    setUserInfo(res.data.data)
                    // console.log('res', res.data.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [localStorage.getItem('token')])

    return (
        <AuthContext.Provider value={{ userInfo, handleLogOut, handleLogin, setUserId, setUserInfo, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
