import request from "../util/request";

const baseUrl = 'http://localhost:3000'

export const updateUserData = (updatedData) => {
    return request.put(baseUrl, updatedData);
};