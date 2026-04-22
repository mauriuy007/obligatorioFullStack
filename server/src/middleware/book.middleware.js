import { validateCreateBook } from "../validators/bookValidator.js";

const validarCrearLibroMiddleware = (req, res, next) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

export { validarCrearLibroMiddleware }
