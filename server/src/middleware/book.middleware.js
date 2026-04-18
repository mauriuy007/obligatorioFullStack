import {validateBook} from "../validators/bookValidator.js";
import {Libro} from "../models/libro.model.js";
import InvalidBookError from "../errors/InvalidBookError.js";

const validarCrearLibroMiddleware = (req, res, next) => {
    const { error } = validateBook(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}