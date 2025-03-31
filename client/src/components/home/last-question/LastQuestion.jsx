import { Link } from 'react-router';
import './LastQuestion.css'
import { useLatestQuiz } from '../../../api/quizAPI';

export default function LastQuestion() {
    const { latestQuiz } = useLatestQuiz();

    return (
        <div className="wrapper-q">
            <div className="home-container">
                <div className="home-left">
                    <h1>Welcome, Space Traveler!</h1>
                    <p>
                        Ready to test your knowledge across the cosmos? Embark on a thrilling journey through quizzes of all levels, from the basics of space exploration to the mysteries of distant galaxies. Challenge yourself with different missions and see how far you can go! Answer questions, earn points, and rise through the ranks as you prove your knowledge. Whether you're a Cadet or an experienced Explorer, there's always a new mission to conquer and a higher rank to achieve. Track your progress, compete with others, and see who leads the cosmic leaderboard! Choose your mission, get ready, and launch it! 🚀
                    </p>
                    <Link to="/quiz" className="home-start-button">Start Your Quiz Quest</Link>
                </div>

                <div className="home-right">
                    <h2>Last Added Quiz</h2>
                    {latestQuiz ? (
                        <>
                        <div className="last-quiz-card">
                            <h3>{latestQuiz.title}</h3>
                            <p>Mission Level: {latestQuiz.category}</p>
                        </div>
                            <Link to={`/quiz/${latestQuiz.category}`} className="home-start-button">Start Mission</Link>
                            </>
                    ) : (
                        <p>No quizzes available yet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}