import { Navigate } from "react-router";
import { useLogout } from "../../api/authAPI";
import ErrorNotification from "../errorNotification/ErrorNotification";

export default function Logout() {
    const { isLoggingOut, error } = useLogout();

    if (error) {
        return <ErrorNotification message={error} type="error" />;
    }

    return isLoggingOut ? <p>Logging out...</p> : <Navigate to="/login" />;
}
