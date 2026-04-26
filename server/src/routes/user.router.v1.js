import express from "express"
import { pasarAPremium } from "../controllers/user.controller.js"

const userRouterV1 = express.Router();

userRouterV1.put('/premium', pasarAPremium)

export { userRouterV1 }