import axiosClient from "../axiosClient"

const createHome = async (homeData) => {
    return await axiosClient.post('/home', homeData);
}

const getHome = async (homeId) => {
    return await axiosClient.get(`/home/${homeId}`);
}

const getAllHomes = async () => {
    return await axiosClient.get('/home');
}

const deleteHome = async (homeId) => {
    return await axiosClient.delete(`/home/${homeId}`);
}

const getHomeOption = async (homeId) => {
    return await axiosClient.get(`/home/setting/${homeId}`);
}

const updateHomeOption = async (homeId, homeOption) => {
    return await axiosClient.put(`/home/setting/${homeId}`, homeOption);
}

export {  createHome, getHome, getAllHomes, deleteHome, getHomeOption, updateHomeOption }