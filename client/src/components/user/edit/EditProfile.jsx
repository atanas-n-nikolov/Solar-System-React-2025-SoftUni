import { useParams, useNavigate } from 'react-router';
import { useUser } from "../../../hooks/useUser";
import { useState, useEffect } from 'react';
import { updateUserData } from "../../../api/userAPI";

const EditProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { userData, loading, error } = useUser(userId);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [editError, setEditError] = useState(null);

    useEffect(() => {
        if (userData) {
            setNewFirstName(userData.firstName || '');
            setNewLastName(userData.lastName || '');
        }
    }, [userData]);

    const handleSaveClick = async () => {
        try {
            const updatedData = { firstName: newFirstName, lastName: newLastName };
            const response = await updateUserData(userId, updatedData);
            setEditError(null);
            console.log("User updated:", response);
            navigate(-1)
        } catch (err) {
            setEditError("Failed to update profile.");
            console.error("Error updating profile:", err);
        }
    };

    const handleCancelClick = () => {
        if (userData) {
            setNewFirstName(userData.firstName || '');
            setNewLastName(userData.lastName || '');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Edit Profile</h1>

            <div>
                <input 
                    type="text" 
                    value={newFirstName} 
                    onChange={(e) => setNewFirstName(e.target.value)} 
                />
            </div>

            <div>
                <input 
                    type="text" 
                    value={newLastName} 
                    onChange={(e) => setNewLastName(e.target.value)} 
                />
            </div>

            <div>
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
                {editError && <p style={{color: 'red'}}>{editError}</p>}
            </div>
        </div>
    );
};

export default EditProfile;
