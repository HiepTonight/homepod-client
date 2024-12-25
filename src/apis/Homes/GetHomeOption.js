import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const getHomeOption = async (homeId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_ROOT}/api/v1/home/setting/${homeId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        // console.log('response', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching devices:', error);
        throw error;
    }
};

export default getHomeOption;