import {
    createBook as createBookInDB,
    getBookById as getBookByIdFromDB,
    getBooks as getBooksFromDB,
} from "../repositories/bookRepo.js";

export const getBooks = async (_req, res) => {
    try {
        const books = await getBooksFromDB();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createBook = async (req, res) => {
    try {
        const newBook = await createBookInDB(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await getBookByIdFromDB(id);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
