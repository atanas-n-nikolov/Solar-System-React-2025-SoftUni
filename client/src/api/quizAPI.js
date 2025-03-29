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