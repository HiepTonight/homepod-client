import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const introspect = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_ROOT}/api/v1/user/introspect`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error introspecting token:', error);
    throw error;
  }
};

export default introspect;