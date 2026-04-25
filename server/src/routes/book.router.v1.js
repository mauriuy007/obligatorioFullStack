import express from "express";
import { crearLibro, obtenerLibrosPorUsuario } from "../controllers/book.controller.js";
import { validarCrearLibroMiddleware } from "../middleware/book.middleware.js";
import { obtenerLibrosPorId } from "../controllers/book.controller.js";
import { modificarLibro } from "../controllers/book.controller.js";
import { eliminarLibro } from "../controllers/book.controller.js";
import { sugerirLibros } from "../controllers/book.controller.js";
import { obtenerLibrosPorGenero } from "../controllers/book.controller.js";

const bookRouterV1 = express.Router();

bookRouterV1.get("/libros", obtenerLibrosPorUsuario)
bookRouterV1.get("/libros/:id", obtenerLibrosPorId)
bookRouterV1.get("/libros/:genero", obtenerLibrosPorGenero)
bookRouterV1.post("/libros", validarCrearLibroMiddleware, crearLibro)
bookRouterV1.put("/libros/:id", modificarLibro)
bookRouterV1.delete("/libros/:id", eliminarLibro)
bookRouterV1.get("/libros/:id/sugerencia-libros", sugerirLibros)


export { bookRouterV1 }