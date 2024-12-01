import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const deleteDevice = async (deviceId) => {
  try {
    const response = await axios.delete(`${API_ROOT}/api/v1/devices/${deviceId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting device:', error);
    throw error;
  }
};

export default deleteDevice;