import { Link } from 'react-router';
import './HeroSection.css'

export default function HeroSection() {

    return (
        <section className="hero">
            <div className="background-image"></div>
            <div className="container">
                <div className="content">
                    <h2>Explore the Solar System</h2>
                    <p>Learn everything about planets, stars, and space exploration!</p>
                    <Link to="/sign-up" className="action-btn">Start Now</Link>
                </div>
            </div>
        </section>
    );
}
