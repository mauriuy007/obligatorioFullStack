import express from "express";
import { agregarImagenReview, borrarReview, crearReview, obtenerReviewsPorLibro } from "../controllers/review.controller.js";
import { uploadReviewImageMiddleware, validarCrearReviewMiddleware } from "../middleware/review.middleware.js";

const reviewRouterV1 = express.Router();

reviewRouterV1.get("/:bookId", obtenerReviewsPorLibro);
reviewRouterV1.post("/:bookId", validarCrearReviewMiddleware, crearReview);
reviewRouterV1.post("/:id/imagen", uploadReviewImageMiddleware, agregarImagenReview);
reviewRouterV1.delete("/:id", borrarReview)

export { reviewRouterV1 };
