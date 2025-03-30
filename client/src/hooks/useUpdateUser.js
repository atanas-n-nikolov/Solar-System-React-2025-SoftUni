import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { updateUserData } from "../api/userAPI";

export const useUpdateUserScore = () => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateScore = async (score) => {
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            await updateUserData(score);
        } catch (err) {
            setError(err.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return { updateScore, loading, error };
};
