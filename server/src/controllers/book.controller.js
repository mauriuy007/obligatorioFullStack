import { createBook } from "../services.js/book.service.v1.js";

// export const getBooks = async (_req, res) => {
//     try {
//         const books = await getBooksFromDB();
//         res.status(200).json(books);
//     } catch (error) {
//         console.error("Error fetching books:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

export const crearLibro = async (req, res) => {
    try {
        const { titulo, calificacion, comentario } = req.body;
        const idUsuario = req.idUsuario;

        const nuevoLibro = await createBook({ titulo, calificacion, comentario }, idUsuario);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(error.code || 500).json({ error: error.message || "Internal server error" });
    }
};

// export const getBookById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const book = await getBookByIdFromDB(id);

//         if (!book) {
//             return res.status(404).json({ error: "Book not found" });
//         }

//         res.status(200).json(book);
//     } catch (error) {
//         console.error("Error fetching book by ID:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };
