import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getUserData } from "../../../api/userAPI";

export default function UserProfile () {
    const { userId } = useParams();
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
                    setError("User profile or comments not found");
                }
            } catch (err) {
                setError("Error fetching user profile and comments");
                console.error("Error fetching user profile:", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{userData?.firstName} {userData?.lastName}</h1>
            <p>Email: {userData?.email}</p>
            <p>Score: {userData?.score}</p>

            <Link to={`/profile/${userId}/edit`}>Edit Profile</Link>

            <div>
                <h2>Comments</h2>
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

            <div>
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
