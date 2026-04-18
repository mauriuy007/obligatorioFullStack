import { Libro } from "../models/book.model.js";
import { InvalidBookError } from "../errors/InvalidBookError.js";
import { getBookByName } from "./googleBooksService.js";

export const createBook = async ({ titulo,calificacion,comentario }, idUsuario) => {
    try {
        const book = await getBookByName(titulo);

        if (!book) {
            throw new InvalidBookError();
        }

        const newBook = {
            titulo: book.title ?? titulo,
            autor: book.authors.join(", ") || "Autor desconocido",
            descripcion: book.description ?? "Sin descripcion",
            estado: "Leido",
            calificacion: calificacion,
            comentario: comentario,
            idUsuario
        };

        return await Libro.create(newBook);
    } catch (error) {
        throw new InvalidBookError();
    }
};
