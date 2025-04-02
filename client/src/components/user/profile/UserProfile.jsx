import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getUserData } from "../../../api/userAPI";
import { deleteUser } from "../../../api/userAPI";
import { UserContext } from "../../../contexts/UserContext";

export default function UserProfile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { userLogoutHandler } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [comments, setComments] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserData(userId);

                if (response && response.user) {
                    setUserData(response.user);
                    setComments(response.comments);
                    setAnswers(response.user.answers);
                } else {
                    setError("User profile or comments not found.");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching user profile and comments.");
                console.error("Error fetching user profile:", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserProfile();
        } else {
            setError("Invalid user ID");
            setLoading(false);
        }
    }, [userId]);

    const handleDeleteUser = async () => {
        try {
            const success = await deleteUser(userId, userLogoutHandler);
            if (success) {
                navigate('/');
            }
        } catch (err) {
            setError("Error deleting user.");
            console.error("Error deleting user:", err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="user-profile">
            <h1>{userData?.firstName} {userData?.lastName}</h1>
            <p>Email: {userData?.email}</p>
            <p>Score: {userData?.score}</p>

            <Link to={`/profile/${userId}/edit`} className="edit-profile-link">Edit Profile</Link>

            <button onClick={handleDeleteUser} className="delete-user-button">
                Delete My Account
            </button>

            <div className="comments-section">
                <h2>Comments</h2>
                {comments.length === 0 ? (
                    <p>No comments available.</p>
                ) : (
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment._id}>
                                <p><strong>Planet:</strong> {comment.planetName}</p>
                                <p><strong>Comment:</strong> {comment.commentText}</p>
                                <p><small>Posted on: {new Date(comment.createdAt).toLocaleString()}</small></p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="answered-questions-section">
                <h2>Answered Questions</h2>
                {answers.length === 0 ? (
                    <p>No questions answered yet.</p>
                ) : (
                    <ul>
                        {answers.map((answer, index) => (
                            <li key={index}>
                                <p><strong>Question category:</strong> {answer.category}</p>
                                <p><strong>Question title:</strong> {answer.title}</p>
                                <p><small>Answered on: {new Date(answer.answeredOn).toLocaleString()}</small></p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
