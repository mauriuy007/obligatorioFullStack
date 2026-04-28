import Joi from "joi";

const reviewSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required().messages({
        "any.required": "Debe ingresar una calificación"
    }),
    comment: Joi.string().trim().min(3).max(1000).valid("")
});

export const validateCreateReview = (review) =>
    reviewSchema.validate(review, { abortEarly: true });
