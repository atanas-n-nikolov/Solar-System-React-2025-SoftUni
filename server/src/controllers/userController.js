import { Router } from "express";
import userService from "../services/userService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import Planet from "../models/Planets.js";
import User from "../models/User.js";
import catchError from "../util/catchError.js";

const userController = Router();

userController.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, rePassword } = req.body;

    try {
        const user = await userService.register(firstName, lastName, email, password, rePassword);
        res.status(200).json(user);
    } catch (err) {
        const error = catchError(err)
        res.status(400).json({ message: error });
    }
});

userController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.login(email, password);
        res.status(200).json(user);

    } catch (err) {
        const error = catchError(err);
        res.status(400).json({ message: error })
    }
})

userController.get('/profile/:userId', isAuth, async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const planets = await Planet.find({ 'comments.user': userId })
            .populate('comments.user', 'firstName lastName')
            .exec();

            const userComments = planets.flatMap(planet =>
                planet.comments
                    .filter(comment => comment.user && comment.user._id && comment.user._id.toString() === userId)
                    .map(comment => ({
                        planetName: planet.name,
                        commentText: comment.text,
                        createdAt: comment.createdAt,
                    }))
            );

        res.status(200).json({
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                score: user.score,
                answers: user.answers || [],
                createdAt: user.createdAt,
            },
            comments: userComments
        });
    } catch (err) {
        console.error(err);
        const error = catchError(err);
        res.status(500).json({ message: error });
    }
});

userController.put('/profile/:userId/score', isAuth, async (req, res) => {
    const userId = req.params.userId;
    const updateData = req.body;

    try {
        const updatedUser = await userService.updateUser(userId, updateData);
        res.status(200).json(updatedUser);
    } catch (err) {
        const error = catchError(err);
        res.status(500).json({ message: error });
    }
});

userController.put('/profile/:userId/edit', isAuth, async (req, res) => {
    const userId = req.params.userId;
    const updateData = req.body;

    try {
        const updatedUser = await userService.updateUser(userId, updateData);
        res.status(200).json(updatedUser);
    } catch (err) {
        const error = catchError(err);
        res.status(500).json({ message: error });
    }
});


userController.post('/planets/:planetId/comments', isAuth, async (req, res) => {
    const { planetId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    try {
        const planet = await Planet.findById(planetId);

        const newComment = {
            user: userId,
            text,
        };

        planet.comments.push(newComment);

        await planet.save();

        const updatedPlanet = await Planet.findById(planetId)
            .populate('comments.user', 'firstName lastName')
            .exec();

        res.status(201).json(updatedPlanet);
    } catch (err) {
        const error = catchError(err);
        res.status(500).json({ message: error });
    }
});

userController.delete('/planets/:planetId/comments/:commentId', isAuth, async (req, res) => {
    const { planetId, commentId } = req.params;
    const userId = req.user._id;

    try {
        const planet = await Planet.findById(planetId);

        const commentIndex = planet.comments.findIndex(comment => comment._id.toString() === commentId);

        planet.comments.splice(commentIndex, 1);

        await planet.save();

        const updatedPlanet = await Planet.findById(planetId)
            .populate('comments.user', 'firstName lastName')
            .exec();

        res.status(200).json({ message: 'Comment deleted successfully' });

    } catch (err) {
        const error = catchError(err);
        res.status(500).json({ message: error });
    }
});


userController.delete('/profile/:userId', isAuth, async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        const error = catchError(err);
        res.status(500).json({ message: error });
    }
});

export default userController