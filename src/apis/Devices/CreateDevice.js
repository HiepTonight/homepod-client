import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const createDevice = async (deviceData) => {
  try {
    const response = await axios.post(`${API_ROOT}/api/v1/devices`, deviceData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating device:', error);
    throw error;
  }
};

export default createDevice;
