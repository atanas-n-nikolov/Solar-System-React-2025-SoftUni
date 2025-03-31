import { useContext } from "react";
import useAuth from "../../../hooks/useAuth"
import { UserContext } from "../../../contexts/UserContext";

export default function UserProfile() {
    const user = useContext(UserContext);
    return (
        <h1>{user.firstName}</h1>
    )
}