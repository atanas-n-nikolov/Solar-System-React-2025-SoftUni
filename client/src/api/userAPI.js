import request from "../util/request";

const baseUrl = 'http://localhost:3030/users/me'

export const updateUserData = (updatedData) => {
    return request.put(baseUrl, updatedData);
};