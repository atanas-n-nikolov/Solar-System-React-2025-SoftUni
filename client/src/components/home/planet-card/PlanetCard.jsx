import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router';
import Slider from "react-slick";
import './PlanetCard.css';
import { usePlanets } from '../../../api/planetsAPI';
import ErrorNotification from '../../errorNotification/ErrorNotification';

export default function PlanetCard() {
    const { planets, error } = usePlanets();

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    function NextArrow({ onClick }) {
        return (
            <div className="next-arrow" onClick={onClick}>
                <FaAngleRight size={30} />
            </div>
        );
    }

    function PrevArrow({ onClick }) {
        return (
            <div className="prev-arrow" onClick={onClick}>
                <FaAngleLeft size={30} />
            </div>
        );
    }

    return (
        <div 
            className="planets-container" 
            style={{ padding: planets.length === 0 ? "0" : "" }}
        >
            
            {error && <ErrorNotification message={error} type="error" />}
            
            {planets.length > 0 ? (
                <Slider className="catalog-slider" {...settings}>
                    {planets.map((planet) => (
                        <div key={planet._id} className="p-2">
                            <div className="card-container">
                                <img
                                    src={planet.image}
                                    alt={planet.name}
                                    className="card-image"
                                />
                                <div className="card-content">
                                    <h2 className="card-title">{planet.name}</h2>
                                    <p className="card-type">Type: {planet.type}</p>
                                    <Link to={`/planet/${planet._id}`} className="card-button">Learn More</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p>No planets available at the moment.</p>
            )}
        </div>
    );
}
