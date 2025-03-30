import { useContext, useEffect } from "react";
import request from "../util/request";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/users';

export const useRegister = () => {
    const register = (firstName, lastName, email, password) => request.post(`${baseUrl}/register`, { firstName, lastName, email, password });

    return {
        register,
    };
};

export const useLogin = () => {
    const login = async (email, password) => request.post(`${baseUrl}/login`, { email, password });

    return {
        login
    };
};

export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        const options = {
            headers: {
                'X-Authorization': accessToken,
            }
        };

        request.get(`${baseUrl}/logout`, null, options)
            .then(userLogoutHandler);

    }, [accessToken, userLogoutHandler]);

    return {
        isLoggedOut: !!accessToken,
    };
};