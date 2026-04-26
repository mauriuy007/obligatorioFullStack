import { Libro } from "../models/book.model.js";
import { InvalidBookError } from "../errors/invalid.book.error.js";
import { getBookByName } from "./googleBooksService.js";
import { BookNotFoundError } from "../errors/book.not.found.error.js";
import { suggestBook } from "./geminiService.js";


export const createBook = async ({ titulo, autor, genero, descripcion, estado }, idUsuario) => {
    const book = await getBookByName(titulo);

    if (!book) {
        throw new InvalidBookError();
    }

    const authorFromGoogleBooks = book.authors?.join(", ");
    const genreFromGoogleBooks = book.categories?.[0];
    const descriptionFromGoogleBooks = book.description;

    const newBook = {
        titulo,
        autor: autor || authorFromGoogleBooks || "Autor desconocido",
        genero: genero || genreFromGoogleBooks || "Sin genero",
        descripcion: descripcion || descriptionFromGoogleBooks || "Sin descripcion",
        estado: estado|| "Pendiente" ,
        idUsuario
    };
    return await Libro.create(newBook);
};

export const getBooksByUserId = async (limit, page, titulo, autor, genero, estado, idUsuario) => {
    const query = { idUsuario: idUsuario }
    const total = await Libro.countDocuments(query)
    page = Number(page)
    limit = Number(limit)
    const skip = (page - 1) * limit

    if(titulo){
        query.titulo = { $regex: titulo, $options: "i" }
    }

    if(autor){
        query.autor = { $regex: autor, $options: "i" }
    }

    if(genero){
        query.genero = { $regex: genero, $options: "i" }
    }

    if(estado){
        query.estado = { $regex: estado, $options: "i"  }
    }

    try{
        const books = await Libro.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        return { books, limit, total, totalPages: Math.ceil(total/limit) }
    }catch(error){
        throw new Error("Error fetching users books")
    }
}

export const countBooksByUserId = async (idUsuario) => {
    return await Libro.countDocuments({ idUsuario });
}

export const getBookById = async (bookId,userId) => {
    const book = await Libro.findOne({ _id: bookId, idUsuario: userId });
    if (!book) {
        throw new BookNotFoundError();
    }
    return book;
}

export const updateBook = async (bookId, userId, updateData) => {
    try {
        const book = await Libro.findOneAndUpdate(
            { _id: bookId, idUsuario: userId },
            updateData,
            {returnDocument: "after",runValidator:true}
        );
        if (!book) {
            throw new BookNotFoundError();
        }
    }catch(error) {
        throw error; 
    }
}
export const deleteBook = async (bookId, userId) => {
    const book = await Libro.findOneAndDelete({ _id: bookId, idUsuario: userId })
    if (!book) {
        throw new BookNotFoundError();
    }
}

export const generateRecommendations = async (userId,bookId) => {
    const book = await Libro.findOne({ _id: bookId, idUsuario: userId });
    if (!book) {
        throw new BookNotFoundError();
    }
    const recommendations = await suggestBook(book);
    return recommendations;
}  

export const getBooksByGenre = async (genero, userId) => {
    return await Libro.find({ genero: genero, idUsuario: userId });

}
