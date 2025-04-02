import { useEffect, useState } from 'react';
import ErrorNotification from '../../errorNotification/ErrorNotification';
import './Facts.css';

export default function Facts() {
    const [fact, setFact] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchFact = async () => {
            try {
                const response = await fetch('http://localhost:3000/fact');
                if (!response.ok) {
                    throw new Error('Failed to fetch the fact data');
                }
                const data = await response.json();
                setFact(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchFact();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <ErrorNotification message={error} type="error" />;
    }

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
