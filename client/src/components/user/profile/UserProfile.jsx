import { Link, useParams } from 'react-router';
import { useUser } from "../../../hooks/useUser";
import { useState, useEffect } from 'react';
import { getUserComments } from "../../../api/userAPI";

const UserProfile = () => {
    const { userId } = useParams();
    const { userData, loading, error } = useUser(userId);
    const [comments, setComments] = useState([]);
    const [commentsError, setCommentsError] = useState(null);

    useEffect(() => {
        const fetchUserComments = async () => {
            try {
                const response = await getUserComments(userId);
                if (response && Array.isArray(response.data)) {
                    setComments(response.data);
                } else {
                    setComments([]);
                }
            } catch (err) {
                setCommentsError("Error fetching comments");
                console.error("Error fetching comments:", err);
            }
        };

        if (userId) {
            fetchUserComments();
        }
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{userData.firstName} {userData.lastName}</h1>
            <p>Email: {userData.email}</p>
            <p>Score: {userData.score}</p>

            <Link to={`/profile/${userId}/edit`}>Edit Profile</Link>

            <div>
                <h2>Comments</h2>
                {commentsError && <p style={{ color: 'red' }}>{commentsError}</p>}
                {comments.length === 0 ? (
                    <p>No comments available.</p>
                ) : (
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>
                                <p><strong>Planet:</strong> {comment.planetName}</p>
                                <p><strong>Comment:</strong> {comment.commentText}</p>
                                <p><small>Posted on: {new Date(comment.createdAt).toLocaleString()}</small></p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
