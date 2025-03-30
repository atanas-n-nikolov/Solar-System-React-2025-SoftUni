import { useParams } from 'react-router';
import { usePlanet } from '../../api/planetsAPI';

import './PlanetDetails.css';

export default function PlanetDetails() {
    const { planetId } = useParams();
    const { planet } = usePlanet(planetId);

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
        </div>
    )
};