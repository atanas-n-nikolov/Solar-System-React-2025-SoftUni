import { Navigate } from "react-router";
import { useLogout } from "../../api/authAPI";

export default function Logout() {
    const { isLoggingOut } = useLogout();

    return isLoggingOut ? <p>Logging out...</p> : <Navigate to="/" />;
}
