import { bookLimitError } from "../errors/book.limit.error.js";
import { crearLibroService } from "../services/book.service.v1.js";
import { obtenerLibrosService } from "../services/book.service.v1.js";
import { obtenerLibrosPorIdService } from "../services/book.service.v1.js";
import { actualizarLibro } from "../services/book.service.v1.js";
import { eliminarLibroService } from "../services/book.service.v1.js";
import { generarRecomendacion } from "../services/book.service.v1.js";
import { contadorLibrosPorUsuario } from "../services/book.service.v1.js";
import { obtenerUsuarioPorId } from "../services/user.service.v1.js";
import { missingLimitPageError } from "../errors/limit.page.error.js"

export const crearLibro = async (req, res) => {
    try {
        const { titulo, autor, genero, descripcion, estado} = req.body;
        const idUsuario = req.idUsuario;
        const usuario = await obtenerUsuarioPorId(idUsuario);

        if (usuario.plan === "Plus") {
            const cantidadLibros = await contadorLibrosPorUsuario(idUsuario);

            if (cantidadLibros >= 4) {
                throw new bookLimitError();
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
        const {limite, pagina, titulo, autor, genero, estado } = req.query
        if(!limite || !pagina){
            throw new missingLimitPageError();
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

export const modificarLibro = async (req, res) => {
    try {
        const idLibro = req.params.id;
        const idUsu = req.idUsuario;
        const { titulo, autor, genero, descripcion, estado } = req.body;
        const libroActualizado = await actualizarLibro(idLibro, idUsu, { titulo, autor, genero, descripcion, estado });
        res.status(200).json(libroActualizado);
    }
    catch(error) {
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
    catch(error) {
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    } 
};

export const sugerirLibros = async (req, res) => {
    try {
        const idUsu = req.idUsuario;
        const idLibro = req.params.id;
        const recomendaciones = await generarRecomendacion(idUsu, idLibro);
        res.status(200).json({ sugerencia: recomendaciones} );
    }
    catch(error) {
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
}
