import { Router } from "express";
import { getReviews } from "../controllers/reviewController.js";

const reviewRouter = Router();
reviewRouter.get("/reviews", getReviews);

export default reviewRouter;
