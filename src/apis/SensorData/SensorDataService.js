import axiosClient from '../axiosClient'

const getAllSensorData = async (homePodId) => {
    try {
        const response = await axiosClient.get(`/home/sensor/${homePodId}/all`)
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to fetch all sensor data')
        }
    } catch (error) {
        console.error('Error fetching all sensor data:', error)
        throw error
    }
}

const getLatestSensorData = async (homePodId) => {
    try {
        const response = await axiosClient.get(`/home/sensor/${homePodId}/latest`)
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to fetch latest sensor data')
        }
    } catch (error) {
        console.error('Error fetching latest sensor data:', error)
        throw error
    }
}

const getTodaySensorData = async (homePodId) => {
    try {
        const response = await axiosClient.get(`/home/sensor/${homePodId}/data/today`)
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to fetch today sensor data')
        }
    } catch (error) {
        console.error('Error fetching today sensor data:', error)
        throw error
    }
}

const getYesterdaySensorData = async (homePodId) => {
    try {
        const response = await axiosClient.get(`/home/sensor/${homePodId}/data/yesterday`)
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to fetch yesterday sensor data')
        }
    } catch (error) {
        console.error('Error fetching yesterday sensor data:', error)
        throw error
    }
}

const get7daySensorData = async (homePodId) => {
    try {
        const response = await axiosClient.get(`/home/sensor/${homePodId}/data/last7days`)
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to fetch last 7 days sensor data')
        }
    } catch (error) {
        console.error('Error fetching last 7 days sensor data:', error)
        throw error
    }
}

export { getAllSensorData, getLatestSensorData, getTodaySensorData, getYesterdaySensorData, get7daySensorData }