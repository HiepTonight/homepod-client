import axios from 'axios'
import { API_ROOT } from '../../utils/constants'

const updateUserInfo = async (user) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${API_ROOT}/api/v1/user/update-info`, user, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        console.log('User info updated:', response)
        return response.data
    } catch (error) {
        console.error('Error updating user info:', error)
        throw error
    }
}

export default updateUserInfo
