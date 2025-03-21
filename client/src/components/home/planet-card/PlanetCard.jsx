import './PlanetCard.css';

export default function PlanetCard({ name, type, image }) {
    return (
        <div className="card-container">
            <img
                src={image}
                alt={name}
                className="card-image"
            />
            <div className="card-content">
                <h2 className="card-title">{name}</h2>
                <p className="card-type">Type: {type}</p>
                <button className="card-button">Learn More</button>
            </div>
        </div>
    );
}
