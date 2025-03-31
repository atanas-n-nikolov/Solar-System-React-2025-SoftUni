import { useContext, useEffect, useState } from "react";
import request from "../util/request";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3000';

export const useRegister = () => {
    const register = (firstName, lastName, email, password, rePassword) => request.post(`${baseUrl}/register`, { firstName, lastName, email, password, rePassword });

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
                userLogoutHandler();

                console.log("Logout successful");
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