import express from "express";
import { obtenerAdmin } from "../controllers/admin.controller.js";
import { obtenerLibros, obtenerReviews } from "../controllers/admin.controller.js";

const adminRouterV1 = express.Router();

adminRouterV1.get("/", obtenerAdmin);
adminRouterV1.get("/libros", obtenerLibros);
adminRouterV1.get("/reviews", obtenerReviews)

export { adminRouterV1 };
