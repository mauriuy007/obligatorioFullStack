import Joi from "joi";

const bookSchema = Joi.object({
    titulo: Joi.string().trim().min(1).required(),
    autor: Joi.string().trim().min(2).max(70),
    genero: Joi.string().trim().min(1).max(30),
    descripcion: Joi.string().trim().min(30).max(2000), 
    estado: Joi.string().valid("Leido", "Pendiente"),
    calificacion: Joi.number().integer().min(1).max(5),
    comentario: Joi.string().trim().max(200)
});

export const validateCreateBook = (book) =>
    bookSchema.validate(book, { abortEarly: true});
