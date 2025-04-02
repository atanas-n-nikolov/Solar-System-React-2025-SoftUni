import './QuizForm.css';
import { updateUserData, useQuizWithUserAnswers } from "../../../api/userAPI";
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate, useParams } from "react-router";
import { useSubmitQuiz } from "../../../api/quizAPI";
import { Link } from 'react-router';

export default function QuizForm() {
    const { category } = useParams();
    const { _id } = useContext(UserContext);
    const { quiz, allAnswered, noQuizInCategory } = useQuizWithUserAnswers(_id, category);

    const [seconds, setSeconds] = useState(3);
    const navigate = useNavigate();
    const hasNavigated = useRef(false);

    const userAnswers = useRef({});

    const handleSubmit = (event) => {
        event.preventDefault();
        submitQuiz();
    };

    const { submitQuiz, result, loading, error } = useSubmitQuiz(quiz, userAnswers.current);

    useEffect(() => {
        if (result !== null && result !== undefined) {
            if (_id) {
                updateUserData(_id, { score: result.score, answers: result.correctAnswers })
                    .then((response) => {
                        console.log("User score updated:", response);
                    })
                    .catch((err) => {
                        console.error("Error updating user score:", err);
                    });
            }

            const timer = setInterval(() => {
                setSeconds((prev) => {
                    if (prev === 1) {
                        clearInterval(timer);
                        if (!hasNavigated.current) {
                            hasNavigated.current = true;
                            setTimeout(() => {
                                navigate('/');
                            }, 0);
                        }
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [result, navigate, _id]);

    if (noQuizInCategory) {
        return <h2>No quiz in this category yet</h2>;
    }

    return (
        <div className="quiz-wrapper">
            {error && <p className="error">{error}</p>}

            {result !== null && result !== undefined && (
                <div className="result">
                    <h2>Your score is:</h2>
                    <h2>{result.score}/{quiz.length}</h2>
                    <p>
                        You will be redirected to Quiz after <span className="timer">{seconds}</span> seconds
                        or <Link to="/quiz" className="redirect-link">click here</Link> to go now.
                    </p>
                    <div>
                        <h3>Correct Answers:</h3>
                        <ul>
                            {result.correctAnswers.map((answer) => (
                                <li key={answer.questionId}>Question ID: {answer.questionId}, Correct Answer: {answer.correctAnswer}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {result === null && !error && quiz.length > 0 && (
                <div className="quiz-form">
                    <form onSubmit={handleSubmit}>
                        {quiz.map((question) => (
                            <div key={question._id}>
                                <h2>{question.title}</h2>
                                <div>
                                    {question.options.map((option, index) => (
                                        <div key={index}>
                                            <input
                                                type="radio"
                                                id={`${question._id}-${option}`}
                                                name={question._id}
                                                value={option}
                                                onChange={() => {
                                                    userAnswers.current[question._id] = option;
                                                }}
                                            />
                                            <label htmlFor={`${question._id}-${option}`}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="quiz-button"
                            disabled={loading}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}

            {allAnswered && !error && (
                <h2>You have answered all the questions in this category!</h2>
            )}
        </div>
    );
}
