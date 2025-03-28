import { Link } from 'react-router';
import './LastQuestion.css'

export default function LastQuestion() {
    const lastQuiz = {
        id: 1,
        title: 'JavaScript Galaxy',
        description: 'Begin your journey through the JavaScript system.',
        questionsCount: 10,
        difficulty: 'Cadet',
    };

    return (
        <div className="wrapper-q">
            <div className="home-container">
                <div className="home-left">
                    <h1>Welcome, Space Traveler!</h1>
                    <p>
                        Ready to test your knowledge across the cosmos? Embark on a thrilling journey through quizzes of all levels, from the basics of space exploration to the mysteries of distant galaxies. Challenge yourself with different missions and see how far you can go! Answer questions, earn points, and rise through the ranks as you prove your knowledge. Whether you're a Cadet or an experienced Explorer, there's always a new mission to conquer and a higher rank to achieve. Track your progress, compete with others, and see who leads the cosmic leaderboard! Choose your mission, get ready, and launch it! 🚀
                    </p>
                    <Link to="/quiz">
                        <button className="home-start-button">Start Your Quiz Quest</button>
                    </Link>
                </div>

                <div className="home-right">
                    <h2>Last Added Quiz</h2>
                    {lastQuiz ? (
                        <div className="last-quiz-card">
                            <h3>{lastQuiz.title}</h3>
                            <p>{lastQuiz.description}</p>
                            <p>Mission Level: {lastQuiz.difficulty}</p>
                        </div>
                    ) : (
                        <p>No quizzes available yet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}