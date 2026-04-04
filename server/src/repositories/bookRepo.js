import {BookgSchema} from '../models/bookModel.js';

export const getBooks = async () => {
    try {
        const books = await BookgSchema.find();
        return books;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
}

export const createBook = async (bookData) => {
    try {
        const newBook = new BookgSchema(bookData);
        await newBook.save();
        return newBook;
    } catch (error) {
        console.error("Error creating book:", error);
        throw error;
    }
}   

export const getBookById = async (id) => {
    try {
        const book = await BookgSchema.findById(id);
        return book;
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        throw error;
    }   
}