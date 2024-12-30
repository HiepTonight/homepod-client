import { React, useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
// import Cookies from 'js-cookie'
import { getUserInfo } from '@/apis/Auth/AuthService'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)
    // const [userId, setUserId] = useState(Cookies.get('userId'))
    const [userId, setUserId] = useState(localStorage.getItem('userId'))

    const handleLogOut = () => {
        // Cookies.remove('token');
        // Cookies.remove('refreshToken');
        // Cookies.remove('userId');

        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userId')

        setUserInfo(null)
        window.location.reload()
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

    return <AuthContext.Provider value={{ userInfo, handleLogOut, setUserId, setUserInfo }}>{children}</AuthContext.Provider>
}