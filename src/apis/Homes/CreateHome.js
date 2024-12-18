import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const createHome = async (homeData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_ROOT}/api/v1/home`, homeData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating home:', error);
        throw error;
    }
};

export default createHome;