import express from "express"
import { login, pasarAPremium, registrar } from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post('/login', login)
authRouter.post('/registrar', registrar)
authRouter.post('/usuarios/premium', authMiddleware, pasarAPremium)

export { authRouter }
