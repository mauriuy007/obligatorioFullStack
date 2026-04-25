import multer from "multer";
import { validateCreateReview } from "../validators/reviews.validator.js";

const storage = multer.memoryStorage();
const uploadReviewImageMiddleware = multer({ storage }).single("imagen");

export const validarCrearReviewMiddleware = (req, res, next) => {
    const { error } = validateCreateReview(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export { uploadReviewImageMiddleware };
