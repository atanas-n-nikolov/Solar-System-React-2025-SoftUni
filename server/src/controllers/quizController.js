import { Router } from "express";
import questions from "../q.js";
import catchError from "../util/catchError.js";

const quizController = Router();

quizController.get("/quiz/latest-quiz", async (req, res) => {
    try {
        const allQuestions = Object.values(questions).flat();

        const latestQuestion = allQuestions.sort((a, b) => b._createdOn - a._createdOn)[0];

        res.json(latestQuestion);
    } catch (err) {
        const error = catchError(err)
        res.status(500).json({ message: error });
    }
});

quizController.get("/quiz", async (req, res) => {
    try {
        const allQuestions = Object.values(questions).flat();
        res.json(allQuestions);
    } catch (err) {
        const error = catchError(err)
        res.status(500).json({ message: error });
    };
});

quizController.get("/quiz/:category", async (req, res) => {
    try {
        const category = req.params.category;
        
        const allQuestions = Object.values(questions).flat();
        
        const filteredQuestions = allQuestions.filter(question => question.category === category);

        res.json(filteredQuestions);
    } catch (err) {
        const error = catchError(err)
        res.status(500).json({ message: error });
    }
});

export default quizController;