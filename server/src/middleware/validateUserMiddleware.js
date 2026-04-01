import {validateUser} from "../validators/userValidator.js";

export const validateUserMiddleware = (req, res, next) => {
    try {
        validateUser(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}