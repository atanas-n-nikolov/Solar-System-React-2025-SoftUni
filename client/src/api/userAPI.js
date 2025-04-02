import request from "../util/request";

const baseUrl = 'http://localhost:3000/profile';

export const getUserData = (userId) => {
    return request.get(`${baseUrl}/${userId}`);
};

export const updateUserData = (userId, updatedData) => {
    if(updatedData.score) {
        return request.put(`${baseUrl}/${userId}/score`, updatedData)
        .then(response => {
            return response;
        })
        .catch(err => {
            console.error("Error in updateUserData:", err);
            throw err;
        });
    } else {
        return request.put(`${baseUrl}/${userId}/edit`, updatedData)
        .then(response => {
            return response;
        })
        .catch(err => {
            console.error("Error in updateUserData:", err);
            throw err;
        });
    }

};

export const getUserComments = (userId) => {

    return request.get(`${baseUrl}/${userId}/comments`)
        .then(response => {
            return response;
        })
        .catch(err => {
            console.error("Error fetching user comments:", err);
            throw err;
        });
};