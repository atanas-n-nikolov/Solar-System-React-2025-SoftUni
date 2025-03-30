import { useParams } from 'react-router';
import { usePlanet } from '../../api/planetsAPI';

import './PlanetDetails.css';

export default function PlanetDetails() {
    const { planetId } = useParams();
    const { planet } = usePlanet(planetId);

    return (
        <div className="planet-detail">
            <h1>{planet.name}</h1>
            <img src={planet.image} alt={planet.name} className="planet-image" />
            <div className="planet-info">
                <p><strong>Type:</strong> {planet.type}</p>
                <p><strong>Distance to Sun:</strong> {planet.distanceToSun}</p>
                <p><strong>Size:</strong> {planet.size}</p>
                <h3>More Information</h3>
                <p>{planet.info}</p>
            </div>
        </div>
    )
};