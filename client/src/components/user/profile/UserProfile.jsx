import { useParams } from 'react-router';
import { useUser } from "../../../hooks/useUser";
import { useState } from 'react';
import { updateUserData } from "../../../api/userAPI";

const UserProfile = () => {
    const { userId } = useParams();
    const { userData, loading, error } = useUser(userId);
    const [isEditing, setIsEditing] = useState(false);
    const [newFirstName, setNewFirstName] = useState(userData?.firstName || '');
    const [newLastName, setNewLastName] = useState(userData?.lastName || '');
    const [editError, setEditError] = useState(null);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setNewFirstName(userData?.firstName || '');
        setNewLastName(userData?.lastName || '');
    };

    const handleSaveClick = async () => {
        try {
            const updatedData = { firstName: newFirstName, lastName: newLastName };
            const response = await updateUserData(userId, updatedData);

            setIsEditing(false);
            setEditError(null);

            console.log("User updated:", response);
        } catch (err) {
            setEditError("Failed to update profile.");
            console.error("Error updating profile:", err);
        }
    };

    return (
        <div>
            <h1>{isEditing ? (
                <input 
                    type="text" 
                    value={newFirstName} 
                    onChange={(e) => setNewFirstName(e.target.value)} 
                />
            ) : (
                `${userData.firstName} ${userData.lastName}`
            )} 
            </h1>
            
            <p>Email: {userData.email}</p>

            {isEditing ? (
                <div>
                    <input 
                        type="text" 
                        value={newLastName} 
                        onChange={(e) => setNewLastName(e.target.value)} 
                    />
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                    {editError && <p style={{color: 'red'}}>{editError}</p>}
                </div>
            ) : (
                <button onClick={handleEditClick}>Edit</button>
            )}
        </div>
    );
};

export default UserProfile;
