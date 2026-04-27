import { createBook } from "../services/book.service.v1.js";
import { getBooksByUserId } from "../services/book.service.v1.js";
import { getBookById } from "../services/book.service.v1.js";
import { updateBook } from "../services/book.service.v1.js";
import { deleteBook } from "../services/book.service.v1.js";
import { generateRecommendations } from "../services/book.service.v1.js";
import { countBooksByUserId } from "../services/book.service.v1.js";
import { getUserById } from "../services/user.service.v1.js";

export const crearLibro = async (req, res) => {
    try {
        const { titulo, autor, genero, descripcion, estado} = req.body;
        const idUsuario = req.idUsuario;
        const usuario = await getUserById(idUsuario);

        if (usuario.plan === "Plus") {
            const cantidadLibros = await countBooksByUserId(idUsuario);

            if (cantidadLibros >= 4) {
                return res.status(403).json({
                    error: "Los usuarios Basico solo pueden registrar hasta 4 libros"
                });
            }
        }

        const nuevoLibro = await createBook({ titulo, autor, genero, descripcion, estado }, idUsuario);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(error.code || 500).json({ error: error.message || "Internal server error" });
    }
};

export const obtenerLibrosPorUsuario = async (req, res) => {
    try {
        const idUsuario = req.idUsuario;
        const {limit, page, titulo, autor, genero, estado } = req.query
        if(!limit || !page){
            res.status(400).json({ message: "page and limit are required" })
            return
        }
        const libros = await getBooksByUserId(limit, page, titulo, autor, genero, estado, idUsuario);
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
        const { titulo, autor, genero, descripcion, estado } = req.body;
        const libroActualizado = await updateBook(bookId, userId, { titulo, autor, genero, descripcion, estado });
        res.status(200).json(libroActualizado);
    }
    catch(error) {
        res.status(error.code || 500).json({ error: error.message || "Internal server error" });
    }
};

export const eliminarLibro = async (req, res) => {
    try {
        console.log(req.params)
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
        res.status(200).json({ recommendation: recomendaciones} );
    }
    catch(error) {
        res.status(error.code || 500).json({ error: error.message || "Internal server error" });
    }
}
