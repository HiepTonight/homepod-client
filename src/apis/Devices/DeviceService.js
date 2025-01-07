import axiosClient from '../axiosClient'

const getAllDevices = async (homePodId) => {
    try {
        const response = await axiosClient.get('/home/device', {
            params: {
                id: homePodId
            }
        })
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to fetch devices')
        }
    } catch (error) {
        console.error('Error fetching devices:', error)
        throw error
    }
}

const createDevice = async (homePodId, deviceData) => {
    try {
        const response = await axiosClient.post(`/home/device/${homePodId}`, deviceData)
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to create device')
        }
    } catch (error) {
        console.error('Error creating device:', error)
        throw error
    }
}

const deleteDevice = async (deviceId) => {
    try {
        const response = await axiosClient.delete(`/home/device/${deviceId}`)
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to delete device')
        }
    } catch (error) {
        console.error('Error deleting device:', error)
        throw error
    }
}

const triggerDevice = async (deviceId, homePodId) => {
    try {
        const response = await axiosClient.post(`/home/device/${deviceId}/trigger`, null, {
            params: {
                homePodId: homePodId
            }
        })
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to trigger device')
        }
    } catch (error) {
        console.error('Error triggering device:', error)
        throw error
    }
}

export { getAllDevices, createDevice, deleteDevice, triggerDevice }
