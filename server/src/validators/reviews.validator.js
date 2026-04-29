import Joi from "joi";

const reviewSchema = Joi.object({
    calificacion: Joi.number().integer().min(1).max(5).required().messages({
        "any.required": "Debe ingresar una calificación",
        "number.base":"La calificación debe ser un número",
        "number.min": "La calificación mínima es 1",
        "number.max": "La calificación máxima es 5"
    }),
    comentario: Joi.string().trim().min(3).max(2000).allow("").optional().messages({
        "string.min":"El comentario debe tener mínimo 3 caracteres",
        "string.max": "El comentario no puede superar los 2000 caracteres"
    })
});

export const validateCreateReview = (review) =>
    reviewSchema.validate(review, { abortEarly: true });
0