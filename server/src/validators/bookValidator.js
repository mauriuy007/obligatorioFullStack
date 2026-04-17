import Joi from "joi";

const BookSchema = {
    titulo: Joi.string().trim().min(1).required(),
    autor: Joi.string().trim().min(1).required(),
    descripcion: Joi.string().trim().min(1).required(),
    estado: estadoSchema,
    calificacion: Joi.number().min(0).max(5),
    comentario: Joi.string().trim().allow(""),
    idUsuario: objectIdSchema.required()
};


export const validateCreateBook = (book) =>
    BookSchema.validate(book);

export { validateCreateBook as validateBook };








