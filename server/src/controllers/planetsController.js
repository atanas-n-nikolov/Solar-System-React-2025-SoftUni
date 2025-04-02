import { Router } from "express";
import Planet from '../models/Planets.js';
import planets from "../p.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import catchError from "../util/catchError.js";

const planetsController = Router();

planetsController.get("/planets", async (req, res) => {
  try {
    const allPlanets = Object.values(planets);
    res.json(allPlanets);
  } catch (err) {
    const error = catchError(err)
    res.status(500).json({ message: error });
  }
});

planetsController.get("/planets/:planetId", async (req, res) => {
  try {
    const planetId = req.params.planetId;

    const planet = await Planet.findById(planetId).populate('comments.user', 'firstName lastName');
    res.json(planet);
  } catch (err) {
    const error = catchError(err)
    res.status(500).json({ message: error });
  }
});

planetsController.post("/planets/:planetId/comment", isAuth, async (req, res) => {
  try {
    const planetId = req.params.planetId;
    const { text } = req.body;

    const planet = await Planet.findById(planetId);

    const newComment = {
      text,
      createdAt: new Date(),
      user: req.user._id,
    };

    planet.comments.push(newComment);

    await planet.save();

    const populatedPlanet = await Planet.findById(planetId)
      .populate('comments.user', 'firstName lastName') 
      .exec();

    res.status(201).json(populatedPlanet);

  } catch (err) {
    const error = catchError(err)
    res.status(500).json({ message: error });
  }
})


export default planetsController;