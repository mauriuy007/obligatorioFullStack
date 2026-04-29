import Joi from "joi";

const reviewSchema = Joi.object({
    calificacion: Joi.number().integer().min(1).max(5).required().messages({
        "any.required": "Debe ingresar una calificación"
    }),
    comentario: Joi.string().trim().min(3).max(1000).valid("").messages({
        "string.min":"El comentario debe tener mínimo 3 caracteres"
    })
});

export const validateCreateReview = (review) =>
    reviewSchema.validate(review, { abortEarly: true });
