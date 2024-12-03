import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const get7daySensorData = async () => {
    try {
        const response = await axios.get(`${API_ROOT}/api/v1/sensor/data/last7days`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching devices:', error);
        throw error;
    }
};

export default get7daySensorData;