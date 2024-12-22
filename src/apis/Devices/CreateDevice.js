import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const createDevice = async (homePodId, deviceData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_ROOT}/api/v1/home/device/${homePodId}`, deviceData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    console.log('Created device:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating device:', error);
    throw error;
  }
};

export default createDevice;