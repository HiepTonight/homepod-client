import axiosClient from '../axiosClient'

const getAllDevices = async (homePodId) => {
    return await axiosClient.get('/home/device', {
        params: {
            id: homePodId
        }
    })
}

const createDevice = async (homePodId, deviceData) => {
    return await axiosClient.post(`/home/device/${homePodId}`, deviceData)
}

const deleteDevice = async (deviceId) => {
    return await axiosClient.delete(`/home/device/${deviceId}`)
}

const triggerDevice = async (deviceId, homePodId) => {
    return await axiosClient.post(`/home/device/${deviceId}/trigger`, {
        homePodId: homePodId
    })
}

export { getAllDevices, createDevice, deleteDevice, triggerDevice }
