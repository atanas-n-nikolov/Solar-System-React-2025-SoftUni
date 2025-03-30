import { useEffect, useState } from "react";
import request from "../util/request";

const baseUrl = 'http://localhost:3030/data/quiz';

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
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 1,
            select: '_id,title,category',
        });

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setLatestQuiz)
    }, []);

    return { latestQuiz };
};

export const useQuizCategory = (category) => {
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        request.get(`${baseUrl}?where=category%3D%22${category}%22`).then(setQuiz)

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