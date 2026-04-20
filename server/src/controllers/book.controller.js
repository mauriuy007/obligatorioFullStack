import { createBook } from "../services.js/book.service.v1.js";
import { getBooksByUserId } from "../services.js/book.service.v1.js";
import { getBookById } from "../services.js/book.service.v1.js";
import { updateBook } from "../services.js/book.service.v1.js";
import { deleteBook } from "../services.js/book.service.v1.js";
import { generateRecommendations } from "../services.js/recommendation.service.v1.js";

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

export const obtenerLibrosPorUsuario = async (req, res) => {
    try {
        // Preguntar si if va acá o en service
        const idUsuario = req.idUsuario;
        const libros = await getBooksByUserId(idUsuario);
        if (!libros || libros.length === 0) {
            return res.status(204).json({ message: "No books found for this user" });
        }
        res.status(200).json(libros);
    }
    catch (error) {
        console.error("Error fetching books for user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const obtenerLibrosPorId = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.idUsuario;
        const libro = await getBookById(bookId, userId);
        res.status(200).json(libro);
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        res.status(error.code || 500).json({ error: error.message || "Internal server error" });
    }
};

    export const modificarLibro = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.idUsuario;
        const { titulo, calificacion, comentario } = req.body;
        const libroActualizado = await updateBook(bookId, { titulo, calificacion, comentario }, userId);
        res.status(200).json(libroActualizado);
    }
    catch(error) {
        res.status(error.code || 500).json({ error: error.message || "Internal server error" });
    }
};

export const eliminarLibro = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.idUsuario;
        await deleteBook(bookId, userId);
        res.status(204).send();
    }
    catch(error) {
        res.status(error.code || 500).json({ error: error.message || "Internal server error" });
    } 
};

export const sugerirLibros = async (req, res) => {
    try {
        const userId = req.idUsuario;
        const bookId = req.params.id;
        const recomendaciones = await generateRecommendations(userId, bookId);
        res.status(200).json(recomendaciones);
    }
    catch(error) {
        res.status(error.code || 500).json({ error: error.message || "Internal server error" });
}
}