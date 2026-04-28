import express from "express"
import { pasarAPremium } from "../controllers/user.controller.js"

const usuarioRouterV1 = express.Router();

usuarioRouterV1.put('/premium', pasarAPremium)

export { usuarioRouterV1 }