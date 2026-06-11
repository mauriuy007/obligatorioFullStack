import { BookLimitError } from "../errors/book.limit.error.js";
import {
    crearLibroService, obtenerLibrosService, obtenerLibrosPorIdService,
    actualizarLibro, eliminarLibroService, generarRecomendacion, contadorLibrosPorUsuario, obtenerOpcionesService
} from "../services/book.service.v1.js";
import { obtenerLibroPorNombre } from "../services/googleBooksService.js";
import { obtenerUsuarioPorId } from "../services/user.service.v1.js"
import { MissingLimitPageError } from "../errors/limit.page.error.js"

export const crearLibro = async (req, res) => {
    try {
        const { titulo, autor, genero, descripcion, estado } = req.body;
        const idUsuario = req.idUsuario;
        const usuario = await obtenerUsuarioPorId(idUsuario);

        if (usuario.plan === "Plus") {
            const cantidadLibros = await contadorLibrosPorUsuario(idUsuario);

            if (cantidadLibros >= 4) {
                throw new BookLimitError();
            }
        }

        const nuevoLibro = await crearLibroService({ titulo, autor, genero, descripcion, estado }, idUsuario);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
};

export const obtenerLibros = async (req, res) => {
    try {
        const idUsuario = req.idUsuario;
        const { limite, pagina, titulo, autor, genero, estado } = req.query
        if (!limite || !pagina) {
            throw new MissingLimitPageError();
        }
        const libros = await obtenerLibrosService(limite, pagina, titulo, autor, genero, estado, idUsuario);
        res.status(200).json(libros);
    }
    catch (error) {
        console.error("Error fetching books for user:", error);
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
};

export const obtenerLibrosPorId = async (req, res) => {
    try {
        const idLibro = req.params.id;
        const idUsu = req.idUsuario;
        const libro = await obtenerLibrosPorIdService(idLibro, idUsu);
        res.status(200).json(libro);
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
};

export const obtenerOpciones = async (req, res) => {
    try {
        const { titulo } = req.query
        const opciones = await obtenerOpcionesService({ titulo });
        res.status(200).json(opciones)
    } catch {
        res.status(e.code || 500).json({
            message: e.message || "Error del lado del servidor"
        })
    }
};

export const modificarLibro = async (req, res) => {
    try {
        const idLibro = req.params.id;
        const idUsu = req.idUsuario;
        const { titulo, autor, genero, descripcion, estado } = req.body;
        const libroActualizado = await actualizarLibro(idLibro, idUsu, { titulo, autor, genero, descripcion, estado });
        res.status(200).json(libroActualizado);
    }
    catch (error) {
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
};

export const eliminarLibro = async (req, res) => {
    try {
        console.log(req.params)
        const idLibro = req.params.id;
        const idUsu = req.idUsuario;
        await eliminarLibroService(idLibro, idUsu);
        res.status(204).send();
    }
    catch (error) {
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
};

export const sugerirLibros = async (req, res) => {
    try {
        const idUsu = req.idUsuario;
        const idLibro = req.params.id;
        const recomendacion = await generarRecomendacion(idUsu, idLibro);
        const nombreLibro = recomendacion.split('\\')
        const datosGoogleLibro = await obtenerLibroPorNombre(nombreLibro[0].trim());
        const imagenLibro = datosGoogleLibro?.imageLinks ?? null;
        res.status(200).json(
            { sugerencia: nombreLibro,
              imagenURL: imagenLibro
             });
        
    }
    catch (error) {
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
}
