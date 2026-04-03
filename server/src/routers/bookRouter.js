import { Router } from "express";

const bookRouter = Router();

import { getBooks } from "../controllers/bookController.js";

bookRouter.get("/books", getBooks);


export default bookRouter;
