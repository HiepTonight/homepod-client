import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const triggerDevice = async (deviceId, homePodId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_ROOT}/api/v1/home/device/${deviceId}/trigger`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        homePodId: homePodId,
      },
    });
    console.log('Device triggered:', response);
    return response.data;
  } catch (error) {
    console.error('Error triggering device:', error);
    throw error;
  }
};

export default triggerDevice;