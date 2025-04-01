import { useEffect, useState } from "react";
import { getUserData } from "../api/userAPI";

export function useUser(userId) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("useEffect triggered, userId:", userId);
        const fetchUserData = async () => {
            try {
                setLoading(true);
                console.log('Fetching user data for userId:', userId);
                const response = await getUserData(userId);
                console.log('Response:', response);
                setUserData(response);
            } catch (err) {
                setError('Failed to fetch user data');
                console.error('Error fetching user data:', err);
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
