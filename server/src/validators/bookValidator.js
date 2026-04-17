import Joi from "joi";

const bookSchema = Joi.object({
    titulo: Joi.string().trim().min(1).required()
});

export const validateCreateBook = (book) =>
    bookSchema.validate(book, { abortEarly: false, stripUnknown: true });

export { validateCreateBook as validateBook };
