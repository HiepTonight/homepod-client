import axiosClient from "../axiosClient"

const getAllSensorData = async (homePodId) => {
    return await axiosClient.get(`/home/sensor/${homePodId}/all`);
}

const getLatestSensorData = async (homePodId) => {
    return await axiosClient.get(`/home/sensor/${homePodId}/latest`);
}

const getTodaySensorData = async (homePodId) => {
    return await axiosClient.get(`/home/sensor/${homePodId}/data/today`);
}

const getYesterdaySensorData = async (homePodId) => {
    return await axiosClient.get(`/home/sensor/${homePodId}/data/yesterday`);
}

const get7daySensorData = async (homePodId) => {
    return await axiosClient.get(`/home/sensor/${homePodId}/data/last7days`);
}