import Joi from "joi";
import { InvalidReviewError } from "../errors/InvalidReviewError.js";
import {Review} from "../models/Review.js";

export const validateReview = (review) => {
    const schema = Joi.object({
        bookId: Joi.string().required(),
        userId: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().max(500).optional(),
    });
    const { error } = schema.validate(review);
    if (error) {
        throw new InvalidReviewError(error.details[0].message);  
    }
}