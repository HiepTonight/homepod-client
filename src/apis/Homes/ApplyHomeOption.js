import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const applyHomeOption = async (id, settings) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_ROOT}/api/v1/home/setting/${id}`, settings, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error applying home option:', error);
        throw error;
    }
};

export default applyHomeOption;
