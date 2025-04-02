import { Router } from "express";
import Facts from '../models/Facts.js'; 
import data from "../f.js";
import catchError from "../util/catchError.js";

const factCotroller = Router();

factCotroller.get("/fact", async (req, res) => {
    try {
        const today = new Date();
        const day = today.getDate().toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const currentDate = `${month}-${day}`; 

            res.json(data[currentDate]);
    } catch (err) {
        const error = catchError(err)
        res.status(500).json({ message: error });
    }
});

export default factCotroller;