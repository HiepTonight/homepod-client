import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const getAllDevices = async () => {
  try {
    const response = await axios.get(`${API_ROOT}/api/v1/devices`, {
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

export default getAllDevices