import { useContext, useEffect, useState } from "react";
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
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        const logoutUser = async () => {
            setIsLoggingOut(true);

            const options = {
                headers: {
                    'X-Authorization': accessToken,
                }
            };

            try {
                await request.get(`${baseUrl}/logout`, options);
                userLogoutHandler();
            } catch (error) {
                console.error("Logout failed", error);
            } finally {
                setIsLoggingOut(false);
            }
        };

        logoutUser();
    }, [accessToken, userLogoutHandler]);

    return {
        isLoggingOut,
    };
};