import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const createDevice = async (homeId, deviceData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_ROOT}/api/v1/home/device/${homeId}`, deviceData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating device:', error);
    throw error;
  }
};

export default createDevice;