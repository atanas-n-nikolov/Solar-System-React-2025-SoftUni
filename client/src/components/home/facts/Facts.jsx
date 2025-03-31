import { useEffect, useState } from 'react';
import './Facts.css';

export default function Facts() {
    const [ fact, setFact ] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/fact').then(res => res.json()).then(setFact)
    }, []);

    return (
        <article className="fact">
            <div className="random-day">
            <div className="fact-header">
                <h2>
                    DID YOU KNOW<br />
                    ON THIS DAY ...
                </h2>
            </div>
            <div className="fact-content">
                <h3><span className="facts-desc-small">IN:</span><span className="facts-desc-large">{fact[0]?.year}</span></h3>
                <p className="title">
                    <span className="facts-desc-small">THE:</span><span className="facts-desc-large">Landing of the Spirit rover on Mars</span>
                </p>
                <p className="description">
                <span className="facts-desc-small">DESC:</span><span className="facts-desc-large">NASA's Spirit rover successfully landed on Mars to search for evidence
                    of past water activity.</span>
                </p>
            </div>
            </div>
        </article>
    );
}
