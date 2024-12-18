import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const deleteHome = async (homeId) => {
    try {
        const token = localStorage.getItem('token');
        console.log('homeId:', homeId);
        const response = await axios.delete(`${API_ROOT}/api/v1/home/${homeId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting home:', error);
        throw error;
    }
};

export default deleteHome;
