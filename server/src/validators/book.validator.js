import Joi from "joi";

const bookSchema = Joi.object({
    titulo: Joi.string().trim().min(1).required().messages({
        "string.empty": "El titulo no puede estar vacío"
    }),
    autor: Joi.string().trim().min(2).max(70).messages({
        "string.max": "Este campo puede tener máximo 70 caracteres"
    }),
    genero: Joi.string().trim().min(1).max(30).messages({
        "string.max": "Este campo puede tener máximo 30 caracteres"
    }),
    descripcion: Joi.string().trim().min(30).max(1000).messages({
        "string.max": "Este campo puede tener máximo 2000 caracteres",
        "string.min": "La descripción debe tener al menos 30 caracteres"

    }), 
    estado: Joi.string().valid("", "Pendiente", "Leyendo", "Leido")
});

export const validateCreateBook = (book) =>
    bookSchema.validate(book, { abortEarly: true});
