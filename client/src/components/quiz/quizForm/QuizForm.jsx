import { useParams } from "react-router"
import { useQuizCategory } from "../../../api/quizAPI";

import './QuizForm.css';

export default function QuizForm() {
    const { category } = useParams();
    const { quiz } = useQuizCategory(category);

    return (
        <div className="quiz-wrapper">
            <div className="quiz-form">
                {quiz.length > 0 ? (
                    quiz.map((question) => (
                        <div key={question._id}>
                            <h2>{question.title}</h2>
                            <div>
                                {question.options.map((option, index) => (
                                    <div key={index}>
                                        <input
                                            type="radio"
                                            id={option}
                                            name={question._id}
                                            value={option}
                                        />
                                        <label htmlFor={option}>{option}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>Not quiz in this category yet</h2>
                )}
                <button>Submit</button>
            </div>
        </div>
    )
}