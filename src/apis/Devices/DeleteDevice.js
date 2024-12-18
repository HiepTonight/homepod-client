import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const deleteDevice = async (deviceId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_ROOT}/api/v1/home/device/${deviceId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting device:', error);
    throw error;
  }
};

export default deleteDevice;