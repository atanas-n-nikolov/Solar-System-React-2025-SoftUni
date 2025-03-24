import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './planet-card/custom-slider.css';
import './Home.css';
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import PlanetCard from "./planet-card/PlanetCard";

export default function Home() {
    const bodies = [
        {
            name: 'Sun',
            type: 'Star',
            image: '/images/sun.jpg',
        },
        {
            name: 'Mercury',
            type: 'Planet',
            image: '/images/mercury.jpg',
        },
        {
            name: 'Venus',
            type: 'Dwarf Planet',
            image: '/images/venus.jpg',
        },
        {
            name: 'Earth',
            type: 'Planet',
            image: '/images/earth.jpg',
        },
        {
            name: 'Mars',
            type: 'Dwarf Planet',
            image: '/images/mars.jpg',
        },
        {
            name: 'Jupiter',
            type: 'Gas Giant',
            image: '/images/jupiter.jpg',
        },
        {
            name: 'Saturn',
            type: 'Dwarf Planet',
            image: '/images/saturn.jpg',
        },
        {
            name: 'Uranus',
            type: 'Dwarf Planet',
            image: '/images/uranus.jpg',
        },
        {
            name: 'Neptune',
            type: 'Dwarf Planet',
            image: '/images/neptune.jpg',
        },
        
    ];

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
            <div
                className="next-arrow"
                onClick={onClick}
            >
                <FaAngleRight size={30} />
            </div>
        );
    }

    function PrevArrow({ onClick }) {
        return (
            <div
                className="prev-arrow"
                onClick={onClick}
            >
                <FaAngleLeft size={30} />
            </div>
        );
    }

    return (
        <>
            <section className="planets-wrapper">
                <div className="planets-header">
                    <h2>Journey Through the Solar System</h2>
                </div>
                <div className="planets-container">
                    <Slider className="catalog-slider" {...settings}>
                        {bodies.map((body, index) => (
                            <div key={index} className="p-2">
                                <PlanetCard key={index} {...body} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        </>
    );
}
