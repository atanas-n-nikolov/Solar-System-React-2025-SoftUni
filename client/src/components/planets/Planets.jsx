import { useState } from "react";

import './Planets.css';

const planetsData = [
    { name: 'Меркурий', description: 'Най-близката планета до Слънцето' },
    { name: 'Венера', description: 'Планета, известна със своите силни атмосферни условия' },
    { name: 'Земя', description: 'Нашата планета, дом на човечеството' },
    { name: 'Марс', description: 'Червената планета, обект на бъдещи мисии' },
    { name: 'Юпитер', description: 'Най-голямата планета в Слънчевата система' },
    { name: 'Сатурн', description: 'Планетата с най-големите пръстени' },
    { name: 'Уран', description: 'Газов гигант, известен със своето наклонено ос' },
    { name: 'Нептун', description: 'Тъмната и студена планета в края на Слънчевата система' },
  ];

export default function Planets() {

    const[filter, setFilter] = useState('');

    const filteredPlanets = planetsData.filter(planet =>
        planet.name.toLowerCase().startsWith(filter.toLowerCase())
    );

    return (
        <div className="wrapper">
            <div className="wrapper">
                <h1>Solar System Planets</h1>

                <input
                    type="text"
                    placeholder="Търси планета..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-input"
                />

                <div className="planet-list">
                    {filteredPlanets.length > 0 ? (
                        filteredPlanets.map((planet, index) => (
                            <div key={index} className="planet-item">
                                <h2>{planet.name}</h2>
                                <p>{planet.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No planets yet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}