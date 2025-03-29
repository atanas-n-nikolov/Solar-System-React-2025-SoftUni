import { useState } from 'react';
import './Quiz.css';

export default function Quiz() {

    const quizzes = [
        {
            id: 1,
            title: 'JavaScript Galaxy',
            description: 'Begin your journey through the JavaScript system.',
            questionsCount: 10,
            difficulty: 'Cadet',
        },
        {
            id: 2,
            title: 'React Nebula',
            description: 'Navigate through complex React components.',
            questionsCount: 15,
            difficulty: 'Commander',
        },
        {
            id: 3,
            title: 'CSS Meteor Field',
            description: 'Dodge tricky selectors and animations.',
            questionsCount: 12,
            difficulty: 'Explorer',
        },
        {
            id: 4,
            title: 'HTML Launchpad',
            description: 'Launch your adventure from the basics of HTML.',
            questionsCount: 8,
            difficulty: 'Cadet',
        },
    ];

    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [isSelected, setIsSelected] = useState(false);

    const handleDifficultyChange = (event) => {
        const selected = event.target.value;
        setSelectedDifficulty(selected);
        setIsSelected(selected !== 'All');
    };

    const handleClearFilter = () => {
        setSelectedDifficulty('All');
        setIsSelected(false);
    };

    const filteredQuizzes =
        selectedDifficulty === 'All'
            ? quizzes
            : quizzes.filter((quiz) => quiz.difficulty === selectedDifficulty);


    return (
        <div className="quiz-container">
            <h1 className="quiz-title">Quiz Quest</h1>
            <div className="welcome">
                <img className="quiz-image" src="images/quiz-image.png" alt="quiz-image" />
                <p className="quiz-intro">
                    Welcome, space traveler! Prepare to embark on a journey across galaxies of knowledge. Choose your mission and begin your quest!
                </p>
            </div>

            <div className="quiz-filter">
                <label htmlFor="difficulty-select">Select mission difficulty:</label>
                <select
                    id="difficulty-select"
                    value={selectedDifficulty}
                    onChange={handleDifficultyChange}
                >
                    <option value="All">All Missions</option>
                    <option value="Cadet">Cadet</option>
                    <option value="Explorer">Explorer</option>
                    <option value="Commander">Commander</option>
                </select>

                {isSelected && (
                    <button className="clear-filter-button" onClick={handleClearFilter}>
                        X
                    </button>
                )}
            </div>

            <div className="quiz-grid">
                {filteredQuizzes.map((quiz) => (
                    <div key={quiz.id} className="quiz-card">
                        <h2 className="quiz-card-title">{quiz.title}</h2>
                        <p className="quiz-card-description">{quiz.description}</p>
                        <p className="quiz-card-count">Questions: {quiz.questionsCount}</p>
                        <p className="quiz-card-difficulty">Mission Level: {quiz.difficulty}</p>
                        <button className="quiz-button">Launch Mission</button>
                    </div>
                ))}
            </div>
        </div>
    )
}