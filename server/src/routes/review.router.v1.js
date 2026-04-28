import express from "express";
import { agregarImagenReview, borrarReview, crearReview, obtenerReviewsPorLibro } from "../controllers/review.controller.js";
import { validarCrearReviewMiddleware } from "../middleware/review.middleware.js";
import multer from "multer";

const reviewRouterV1 = express.Router();
const upload = multer();

reviewRouterV1.get("/reviews/:idLibro", obtenerReviewsPorLibro);
reviewRouterV1.post("/reviews/:idLibro", validarCrearReviewMiddleware, crearReview);
reviewRouterV1.post("/reviews/:id/imagen", upload.single("img"), agregarImagenReview);
reviewRouterV1.delete("/reviews/:id", borrarReview)

export { reviewRouterV1 };
