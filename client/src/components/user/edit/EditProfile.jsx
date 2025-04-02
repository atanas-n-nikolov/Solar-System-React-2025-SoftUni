import { useParams, useNavigate } from 'react-router';
import { useUser } from "../../../hooks/useUser";
import { useState, useEffect } from 'react';
import { updateUserData } from "../../../api/userAPI";

export default function EditProfile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { userData, loading, error } = useUser(userId);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [editError, setEditError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (userData) {
            setNewFirstName(userData.firstName || '');
            setNewLastName(userData.lastName || '');
        }
    }, [userData]);

    const handleSaveClick = async () => {
        try {
            setIsSaving(true);
            const updatedData = { firstName: newFirstName, lastName: newLastName };
            await updateUserData(userId, updatedData);
            setEditError(null);
            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => navigate(`/profile/${userId}`), 1500);
        } catch (err) {
            setEditError("Failed to update profile. Please try again.");
            console.error("Error updating profile:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancelClick = () => {
        if (userData) {
            setNewFirstName(userData.firstName || '');
            setNewLastName(userData.lastName || '');
        };

        navigate(-1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="edit-profile">
            <h1>Edit Profile</h1>

            <div>
                <label htmlFor="first-name">First Name</label>
                <input 
                    id="first-name"
                    type="text" 
                    value={newFirstName} 
                    onChange={(e) => setNewFirstName(e.target.value)} 
                    disabled={isSaving}
                />
            </div>

            <div>
                <label htmlFor="last-name">Last Name</label>
                <input 
                    id="last-name"
                    type="text" 
                    value={newLastName} 
                    onChange={(e) => setNewLastName(e.target.value)} 
                    disabled={isSaving}
                />
            </div>

            <div>
                <button 
                    onClick={handleSaveClick} 
                    disabled={isSaving}
                >
                    {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button onClick={handleCancelClick}>Cancel</button>
                {editError && <p style={{color: 'red'}}>{editError}</p>}
                {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
            </div>
        </div>
    );
};