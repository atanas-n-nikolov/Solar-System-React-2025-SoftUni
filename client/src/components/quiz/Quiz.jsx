import './Quiz.css';
import { useQuiz } from '../../api/quizAPI';
import { Link } from 'react-router';

export default function Quiz() {
    const { quiz } = useQuiz();

    const categories = quiz.reduce((acc, question) => {
        if (!acc[question.category]) {
            acc[question.category] = [];
        }
        acc[question.category].push(question);
        return acc;
    }, {});

    return (
        <div className="quiz-container">
            <h1 className="quiz-title">Quiz Quest</h1>
            <div className="welcome">
                <img className="quiz-image" src="images/quiz-image.png" alt="quiz-image" />
                <p className="welcome-intro">
                    Welcome, space traveler! Prepare to embark on a journey across galaxies of knowledge. Choose your mission and begin your quest!
                </p>
            </div>
        {quiz.length > 0 ? (
            <div className="quiz-grid">
                {Object.keys(categories).map((category) => (
                    <div key={category} className="quiz-card">
                        <h2 className="quiz-card-title">{category} Missions</h2>
                        <p className="quiz-card-count">Number of Questions: {categories[category].length}</p>
                        <p className="quiz-card-difficulty">Mission Level: {category}</p>
                        <Link to={`/quiz/${category}`} className="quiz-button">Launch Mission</Link>
                    </div>
                ))}
            </div>
        ) : <h1 className="quiz-title">Not quiz yet</h1>}
            
        </div>
    );
}
