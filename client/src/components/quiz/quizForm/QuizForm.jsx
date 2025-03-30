import { Link, useNavigate, useParams } from "react-router";
import { useQuizCategory, useSubmitQuiz } from "../../../api/quizAPI";

import './QuizForm.css';
import { useEffect, useState } from "react";
import { useUpdateUserScore } from "../../../hooks/useUpdateUser";

export default function QuizForm() {
    const { category } = useParams();
    const { quiz } = useQuizCategory(category);
    const [userAnswers, setUserAnswers] = useState({});
    const { submitQuiz, result, loading, error } = useSubmitQuiz(quiz, userAnswers);
    const [seconds, setSeconds] = useState(3);
    const navigate = useNavigate();
    
    const { updateScore } = useUpdateUserScore();

    const handleAnswerChange = (questionId, selectedOption) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitQuiz();
    };

    useEffect(() => {
        setUserAnswers({});
    }, [quiz]);

    useEffect(() => {
        if (result !== null) {
            updateScore(result);

            // const timer = setInterval(() => {
            //     setSeconds((prev) => {
            //         if (prev === 1) {
            //             clearInterval(timer);
            //             navigate("/quiz");
            //         }
            //         return prev - 1;
            //     });
            // }, 1000);

            // return () => clearInterval(timer);
        }
    }, [result, navigate, updateScore]);

    return (
        <div className="quiz-wrapper">
            {error && <p className="error">{error}</p>}

            {result !== null && result !== undefined && (
                <div className="result">
                    <h2>Your score is:</h2>
                    <h2>{result}/{quiz.length}</h2>
                    <p>
                        You will be redirected to Quiz after <span className="timer">{seconds}</span> seconds
                        or <Link to="/quiz" className="redirect-link">click here</Link> to go now.
                    </p>
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
                                                checked={userAnswers[question._id] === option}
                                                onChange={() => handleAnswerChange(question._id, option)}
                                            />
                                            <label htmlFor={`${question._id}-${option}`}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <Link
                            to="#"
                            className="quiz-button"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            Submit
                        </Link>
                    </form>
                </div>
            )}

            {quiz.length === 0 && !error && (
                <h2>Not quiz in this category yet</h2>
            )}
        </div>
    );
}
