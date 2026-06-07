import express from "express";
import { crearLibro, obtenerLibros, obtenerOpciones } from "../controllers/book.controller.js";
import { validarCrearLibroMiddleware } from "../middleware/book.middleware.js";
import { obtenerLibrosPorId } from "../controllers/book.controller.js";
import { modificarLibro } from "../controllers/book.controller.js";
import { eliminarLibro } from "../controllers/book.controller.js";
import { sugerirLibros } from "../controllers/book.controller.js";
const bookRouterV1 = express.Router();

bookRouterV1.get("/libros/buscar", obtenerOpciones)
bookRouterV1.get("/libros/:id/sugerencia-libros", sugerirLibros)
bookRouterV1.get("/libros", obtenerLibros)
bookRouterV1.get("/libros/:id", obtenerLibrosPorId)
bookRouterV1.post("/libros", validarCrearLibroMiddleware, crearLibro)
bookRouterV1.put("/libros/:id", modificarLibro)
bookRouterV1.delete("/libros/:id", eliminarLibro)


export { bookRouterV1 }