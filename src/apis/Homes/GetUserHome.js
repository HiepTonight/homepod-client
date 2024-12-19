import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const getUserHomes = async (homeId) => {
  try {
    const token = localStorage.getItem('token');
    // console.log('token', token);
    const response = await axios.get(`${API_ROOT}/api/v1/home/${homeId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user homes:', error);
    throw error;
  }
};

export default getUserHomes;
