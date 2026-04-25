import express from "express";
import { agregarImagenReview, crearReview, obtenerReviewsPorLibro } from "../controllers/review.controller.js";
import { uploadReviewImageMiddleware, validarCrearReviewMiddleware } from "../middleware/review.middleware.js";

const reviewsRouterV1 = express.Router();

reviewsRouterV1.post("/libros/:bookId", validarCrearReviewMiddleware, crearReview);
reviewsRouterV1.get("/libros/:bookId", obtenerReviewsPorLibro);
reviewsRouterV1.post("/:id/imagen", uploadReviewImageMiddleware, agregarImagenReview);

export { reviewsRouterV1 };
