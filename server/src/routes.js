import { Router } from "express";
import factCotroller from "./controllers/factController.js";
import quizController from "./controllers/quizController.js";
import planetsController from "./controllers/planetsController.js";
import userController from "./controllers/userController.js";

const routes = Router();

routes.use(factCotroller);
routes.use(quizController);
routes.use(planetsController);
routes.use(userController);
export default routes;