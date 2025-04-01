import { useEffect, useState } from "react";
import { getUserData } from "../api/userAPI";

export function useUser(userId) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await getUserData(userId);
                setUserData(response);
            } catch (err) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserData(); 
        }
    }, [userId]);

    return {
        userData,
        loading,
        error,
    };
}
