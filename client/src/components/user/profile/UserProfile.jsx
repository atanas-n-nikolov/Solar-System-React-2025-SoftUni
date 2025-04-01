import { useParams } from 'react-router';
import { useUser } from "../../../hooks/useUser";

const UserProfile = () => {
    const { userId } = useParams();
    const { userData, loading, error } = useUser(userId);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{userData.firstName} {userData.lastName}</h1>
            <p>Email: {userData.email}</p>
        </div>
    );
};


export default UserProfile;
