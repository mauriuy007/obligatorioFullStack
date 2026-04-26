import express from "express";
import { agregarImagenReview, crearReview, obtenerReviewsPorLibro } from "../controllers/review.controller.js";
import { uploadReviewImageMiddleware, validarCrearReviewMiddleware } from "../middleware/review.middleware.js";

const reviewRouterV1 = express.Router();

reviewRouterV1.get("/reviews/:bookId", obtenerReviewsPorLibro);
reviewRouterV1.post("/reviews/:bookId", validarCrearReviewMiddleware, crearReview);
reviewRouterV1.post("/:id/imagen", uploadReviewImageMiddleware, agregarImagenReview);

export { reviewRouterV1 };
