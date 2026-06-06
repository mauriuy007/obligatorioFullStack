import express from "express";
import { obtenerEstadisticasUsuario } from "../controllers/stats.controller.js";

const statsRouterV1 = express.Router();

statsRouterV1.get("/stats", obtenerEstadisticasUsuario);

export { statsRouterV1 };
