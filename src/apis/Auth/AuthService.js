import axiosClient from "../axiosClient"

const signIn = async (body) => {
    return await axiosClient.post('/user/login', body);
};

const getUserInfo = async () => {
    return await axiosClient.get('/user/me');
}

const introspectToken = async (token) => {
    return await axiosClient.post('/user/introspect', { token });
}

export {
    signIn,
    getUserInfo,
    introspectToken
}