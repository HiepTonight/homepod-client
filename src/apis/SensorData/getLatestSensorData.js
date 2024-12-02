import axios from 'axios'
import { API_ROOT } from '../../utils/constants'

//Catch lỗi tập trung tại Intercepters

export const getLatestSensorData = async () => {
  const response = await axios.get( API_ROOT+`/api/v1/sensor/latest` )

  return response.data
}