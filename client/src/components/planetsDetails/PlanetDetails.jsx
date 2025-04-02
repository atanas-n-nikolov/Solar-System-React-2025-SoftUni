import { useParams } from 'react-router';
import { usePlanet } from '../../api/planetsAPI';
import { useState, useEffect, useCallback } from 'react';
import './PlanetDetails.css';
import { addCommentToPlanet, deleteCommentFromPlanet } from '../../api/planetsAPI';
import useAuth from '../../hooks/useAuth';
import ErrorNotification from '../errorNotification/ErrorNotification';

export default function PlanetDetails() {
    const { isAuthenticated, userId } = useAuth();
    const { planetId } = useParams();
    const { planet, setPlanet, error, loading } = usePlanet(planetId);

    const [newComment, setNewComment] = useState('');
    const [commenting, setCommenting] = useState(false);
    const [commentError, setCommentError] = useState(null);

    const handleCommentSubmit = useCallback(async (e) => {
        e.preventDefault();
        setCommenting(true);
        setCommentError(null);

        try {
            const response = await addCommentToPlanet(planetId, newComment);
            if (response) {
                setPlanet(response);
                setNewComment('');
            }
        } catch (err) {
            setCommentError('Failed to add comment.');
            console.error('Error adding comment:', err);
        } finally {
            setCommenting(false);
        }
    }, [newComment, planetId]);

    const handleCommentDelete = async (commentId) => {
        try {
            const success = await deleteCommentFromPlanet(planetId, commentId);
            
            if (success) {
                setPlanet(prevPlanet => {
                    const updatedComments = prevPlanet.comments.filter(comment => comment._id !== commentId);
                    return { ...prevPlanet, comments: updatedComments };
                });
            }
        } catch (err) {
            console.error('Error deleting comment:', err);
            setCommentError('Failed to delete comment.');
        }
    };

    useEffect(() => {
        if (planet) {
            setNewComment('');
        }
    }, [planet]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <ErrorNotification message="Error loading planet details." type="error" />;
    }

    return (
        <div className="planet-details">
            <div className="planet-main">
                <div className="hero-section">
                    <img src={planet.image} alt={planet.name} className="planet-picture" />
                </div>
                <div className="aside">
                    <h1>{planet.name}</h1>
                    <p><strong>Type:</strong> {planet.type}</p>
                    <p><strong>Distance to Sun:</strong> {planet.distanceToSun}</p>
                    <p><strong>Size:</strong> {planet.size}</p>
                </div>
            </div>

            <div className="planet-info">
                <h3>More Information</h3>
                <p>{planet.info}</p>
            </div>

            {isAuthenticated && (
                <div className="planet-comments">
                    <h3>Comments</h3>
                    {planet.comments?.length > 0 ? (
                        planet.comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <p>
                                    <strong>
                                        {comment.user ? `${comment.user.firstName} ${comment.user.lastName}` : 'Anonymous'}
                                    </strong>: {comment.text}
                                </p>
                                <p><em>{new Date(comment.createdAt).toLocaleString()}</em></p>
                                {comment.user && comment.user._id === userId && (
                                    <button onClick={() => handleCommentDelete(comment._id)}>Delete</button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}

                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            rows="4"
                            required
                        />
                        <button type="submit" disabled={commenting}>Submit</button>
                    </form>

                    {commentError && <ErrorNotification message={commentError} type="error" />}
                </div>
            )}
        </div>
    );
}