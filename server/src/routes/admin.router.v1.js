import express from "express";
import { obtenerAdmin } from "../controllers/admin.controller.js";

const adminRouterV1 = express.Router();

adminRouterV1.get("/", obtenerAdmin);

export { adminRouterV1 };
