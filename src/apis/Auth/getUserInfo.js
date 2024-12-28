import axios from 'axios'
import { API_ROOT } from '../../utils/constants'

const getUserInfo = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${API_ROOT}/api/v1/user/me`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        // console.log('User info:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching user info:', error)
        throw error
    }
}

export default getUserInfo
