import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const getYesterdaySensorData = async (homePodId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_ROOT}/api/v1/home/sensor/${homePodId}/data/yesterday`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching devices:', error);
        throw error;
    }
};

export default getYesterdaySensorData;