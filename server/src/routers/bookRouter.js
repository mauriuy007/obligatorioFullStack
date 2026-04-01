import { Router } from "express";

const router = Router();

import { getBooks } from "../controllers/bookController.js";
import { validateHeaderMiddleware } from "../middleware/authMiddleware.js";

router.get("/books", validateHeaderMiddleware, getBooks);

export default router;