import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import request from "../util/request";

export default function useAuth() {
    const authData = useContext(UserContext);

    const accessToken = authData?.accessToken || localStorage.getItem('accessToken');
    
    const requestWrapper = (method, url, data, options = {}) => {
        const authOptions = {
            ...options,
            headers: {
                'Authorization': accessToken ? `Bearer ${accessToken}` : '',
                ...options.headers
            }
        };
    
        return request[method.toLowerCase()](url, data, authOptions); 
    };

    return {
        ...authData,
        userId: authData?._id || localStorage.getItem('userId'),
        isAuthenticated: !!accessToken,
        request: {
            get: requestWrapper.bind(null, 'GET'),
            post: requestWrapper.bind(null, 'POST'),
            put: requestWrapper.bind(null, 'PUT'),
            delete: requestWrapper.bind(null, 'DELETE'),
        }
    }
};
