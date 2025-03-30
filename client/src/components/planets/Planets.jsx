import { Link } from 'react-router';
import { usePlanets } from '../../api/planetsAPI';
import './Planets.css';

export default function Planets() {
    const { planets } = usePlanets();

    return (
        <div className="planets-wrapper">
                <h1 className="planets-header">Solar System Planets</h1>
            <div className="welcome">
                <img className="welcome-image" src="images/planets-image.png" alt="planets-image" />
                <p className="welcome-intro">Welcome, cosmic explorer! Prepare to venture through the vast wonders of our solar system. Discover the secrets of each planet and explore their unique characteristics. Select your planet and begin your celestial journey!</p>
            </div>
            <div className="wrapper-p">
                {planets.length > 0 ? (
                    planets.map(planet => {
                        return (
                            <div key={planet._id} className="planet-container">
                                <img
                                    src={planet.image}
                                    alt={planet.name}
                                    className="planet-image"
                                />
                                <div className="planet-content">
                                    <h2 className="planet-title">{planet.name}</h2>
                                    <p className="planet-type">Type: {planet.type}</p>
                                    <p className="planet-type">Distance: {planet.distanceToSun}</p>
                                    <p className="planet-type">Size: {planet.size}</p>
                                    <Link to={`/planet/${planet._id}`} className="planet-button">Learn More</Link>
                                </div>
                            </div>
                        );
                    })
                ) : <h2>No planets yet</h2>}
            </div>
        </div>
    );
}
