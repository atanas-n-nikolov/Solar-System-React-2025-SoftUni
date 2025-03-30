import { useEffect, useState } from "react";
import request from "../util/request";

const baseUrl = 'http://localhost:3030/data/planets';

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

    return { planet };
};