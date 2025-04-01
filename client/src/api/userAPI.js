import request from "../util/request";

const baseUrl = 'http://localhost:3000/profile';

export const getUserData = (userId) => {
    return request.get(`${baseUrl}/${userId}`);
};

export const updateUserData = (updatedData) => {
    return request.put(baseUrl, updatedData);
};