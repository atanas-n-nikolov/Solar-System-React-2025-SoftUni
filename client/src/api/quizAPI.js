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
        quizData.forEach((question) => {
            if (userAnswers[question._id] === question.correctAnswer) {
                score += 1;
            }
        });
        return score;
    };

    const submitQuiz = () => {
        setLoading(true);
        try {
            const score = calculateScore();
            setResult(old => score);
        } catch (err) {
            setError(err.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return { submitQuiz, result, loading, error };
};