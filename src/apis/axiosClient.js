import axios from 'axios'
// import Cookies from 'js-cookie'
import { API_ROOT } from '../utils/constants'
import { API_VERSION } from '../utils/constants'

const axiosClient = axios.create({
    baseURL: API_ROOT + API_VERSION,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

const handleRequestSuccess = async (config) => {
    // const token = Cookies.get('token');
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}

const handleRequestErr = (err) => {
    return Promise.reject(err)
}

const handleResponseSuccess = (res) => {
    return res
}

const handleResponseErr = async (err) => {
    const originalRequest = err.config

    if (err.response.status === 401  && !originalRequest._retry || err.response.status === 500 && !originalRequest._retry) {
        originalRequest._retry = true

        // const refreshToken = Cookies.get('refreshToken');
        const refreshToken = localStorage.getItem('refreshToken')

        console.log('Refresh token:', refreshToken)

        if (!refreshToken) return Promise.reject(err)

        try {
            const res = await axiosClient.post('/user/refresh-token', {
                refreshToken: refreshToken
            })

            const newAccessToken = res.data.data.accessToken

            // Cookies.set('token', newAccessToken);
            localStorage.setItem('token', newAccessToken)

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

            return axiosClient(originalRequest)
        } catch (error) {
            // Cookies.remove('token');
            // Cookies.remove('refreshToken');
            // Cookies.remove('userId');

            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('userId')

            window.location.href = '/login'

            return Promise.reject(error)
        }
    }
}

axiosClient.interceptors.request.use(
    (config) => handleRequestSuccess(config),
    (err) => handleRequestErr(err)
)

axiosClient.interceptors.response.use(
    (config) => handleResponseSuccess(config),
    (err) => handleResponseErr(err)
)

export default axiosClient
