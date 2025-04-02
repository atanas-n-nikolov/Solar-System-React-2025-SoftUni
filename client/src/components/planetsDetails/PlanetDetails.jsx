import { useParams } from 'react-router';
import { usePlanet } from '../../api/planetsAPI';
import './PlanetDetails.css';

export default function PlanetDetails() {
    const { planetId } = useParams();
    const { planet, error, loading } = usePlanet(planetId);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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

            <div className="planet-comments">
                <h3>Comments</h3>
                {planet.comments?.length > 0 ? (
                    planet.comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p><strong>{comment.user.firstName} {comment.user.lastName}</strong>: {comment.text}</p>
                            <p><em>{new Date(comment.createdAt).toLocaleString()}</em></p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    );
}
