import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './planet-card/custom-slider.css';
import './Home.css';
import PlanetCard from "./planet-card/PlanetCard";
import Facts from "./facts/Facts";
import LastQuestion from "./last-question/LastQuestion";

export default function Home() {



    return (
        <>
            <section className="planets-wrapper">
                <div className="planets-header">
                    <h2>Journey Through the Solar System</h2>
                </div>
                    <PlanetCard />
                    <section className="something">
                        <Facts />
                        <LastQuestion />
                    </section>
            </section>
        </>
    );
}
