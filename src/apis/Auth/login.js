import axios from 'axios';
import { API_ROOT } from '../../utils/constants';

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_ROOT}/api/v1/user/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export default login;