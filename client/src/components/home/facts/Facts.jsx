import { Link } from 'react-router';
import './Facts.css';

export default function Facts() {
    return (
        <article className="random-day">
            <div className="fact-header">
                <h2>
                    Did you know<br />
                    on this day ...
                </h2>
            </div>
            <div className="fact-content">
                <h3>2004</h3>
                <p className="title">Landing of the Spirit rover on Mars</p>
                <p className="description">
                    NASA's Spirit rover successfully landed on Mars to search for evidence
                    of past water activity.
                </p>
                <p className="source"><Link to="https://mars.nasa.gov">NASA</Link></p>
            </div>
        </article>
    );
}
