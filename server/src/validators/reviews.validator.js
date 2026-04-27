import Joi from "joi";

const reviewSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().trim().min(3).max(1000).optional()
});

export const validateCreateReview = (review) =>
    reviewSchema.validate(review, { abortEarly: true });
