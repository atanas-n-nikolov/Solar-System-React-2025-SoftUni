import { useEffect, useState } from "react";
import request from "../util/request";

const baseUrl = 'http://localhost:3000/quiz';

export const useQuiz = () => {
    const [quiz, setQuiz] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await request.get(baseUrl);
                setQuiz(response);
            } catch (error) {
                setError('Failed to load quizzes. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, []);

    return { quiz, error, loading };
};

export const useLatestQuiz = () => {
    const [latestQuiz, setLatestQuiz] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await request.get(`${baseUrl}/latest-quiz`);
                setLatestQuiz(response);
            } catch (error) {
                setError('Failed to load the latest quiz. Please try again later.');
            }
        };

        fetchQuiz();
    }, []);

    return { latestQuiz, error };
};

export const useSubmitQuiz = (quizData, userAnswers) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const calculateScore = () => {
        let score = 0;
        const correctAnswers = [];

        quizData.forEach((question) => {
            if (userAnswers[question._id] === question.correctAnswer) {
                score += 1;
                correctAnswers.push({
                    questionId: question._id,
                    category: question.category,
                    title: question.title,
                    correctAnswer: question.correctAnswer
                });
            }
        });

        return { score, correctAnswers };
    };

    const submitQuiz = () => {
        setLoading(true);
        try {
            const { score, correctAnswers } = calculateScore();
            setResult({ score, correctAnswers });
        } catch (err) {
            setError(err.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return { submitQuiz, result, loading, error };
};
