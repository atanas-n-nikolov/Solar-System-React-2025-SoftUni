import { useEffect, useState } from "react";
import request from "../util/request";

const baseUrl = 'http://localhost:3000/quiz';

export const useQuiz = () => {
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then(setQuiz)
    }, []);

    return { quiz };
};

export const useLatestQuiz = () => {
    const [latestQuiz, setLatestQuiz] = useState([]);

    useEffect(() => {
        request.get(`${baseUrl}/latest-quiz`)
            .then(setLatestQuiz)
    }, []);

    return { latestQuiz };
};

export const useQuizCategory = (category) => {
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        request.get(`${baseUrl}/${category}`).then(setQuiz)

    }, [category]);

    return { quiz };
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
