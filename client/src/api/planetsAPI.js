import { useEffect, useState } from "react";
import request from "../util/request";

const baseUrl = 'http://localhost:3000/planets';

export const usePlanets = () => {
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then(setPlanets)
    }, []);

    return { planets };
};

export const usePlanet = (planetId) => {
    const [planet, setPlanet] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${planetId}`)
            .then(setPlanet)
    }, [planetId]);

    return { planet, setPlanet };
};

export const addCommentToPlanet = async (planetId, commentText) => {
    try {
        const response = await request.post(`${baseUrl}/${planetId}/comment`, {
            text: commentText
        });

        return response;
    } catch (err) {
        console.error('Failed to add comment:', err);
        throw new Error('Failed to add comment');
    }
};

export const deleteCommentFromPlanet = async (planetId, commentId) => {
    try {
        const response = await request.delete(`${baseUrl}/${planetId}/comments/${commentId}`);

        console.log('Server Response:', response);

        const data = await response;

        if (data.message === 'Comment deleted successfully') {
            return true;
        } else {
            throw new Error('Failed to delete comment');
        }
    } catch (err) {
        console.error('Error deleting comment:', err);
        throw err;
    }
};
