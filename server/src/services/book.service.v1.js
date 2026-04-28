import { Libro } from "../models/book.model.js";
import { obtenerLibroPorNombre } from "./googleBooksService.js";
import { BookNotFoundError } from "../errors/temp.book.not.found.error.js";
import { sugerirLibro } from "./geminiService.js";
import { libroDto } from "../dtos/book.dto.js";


export const crearLibroService = async ({ titulo, autor, genero, descripcion, estado }, idUsuario) => {
    const libro = await obtenerLibroPorNombre(titulo);
    console.log(libro)

    const autorGoogleBooks = libro.authors?.join(", ");
    const generoGoogleBooks = libro.categories?.[0];
    const descGoogleBooks = libro.description;

    const nuevoLibro = {
        titulo,
        autor: autor || autorGoogleBooks || "Autor desconocido",
        genero: genero || generoGoogleBooks || "Sin genero",
        descripcion: descripcion || descGoogleBooks || "Sin descripcion",
        estado: estado|| "Pendiente" ,
        idUsuario
    };

    console.log(titulo);
    console.log(autor);


    const guardarLibro = await Libro.create(nuevoLibro);
    const devolverLibro = libroDto(guardarLibro); 

    return devolverLibro;
};

export const obtenerLibrosService = async (limite, pagina, titulo, autor, genero, estado, idUsuario) => {
    const query = { idUsuario: idUsuario }
    const total = await Libro.countDocuments(query)
    pagina = Number(pagina)
    limite = Number(limite)
    const skip = (pagina - 1) * limite

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
        const libro = await Libro.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limite);

        return { libro, limite, total, totalPaginas: Math.ceil(total/limite) }
    }catch(error){
        throw new BookNotFoundError();
    }
}

export const contadorLibrosPorUsuario = async (idUsuario) => {
    return await Libro.countDocuments({ idUsuario });
}

export const obtenerLibrosPorIdService = async (idLibro,idUsu) => {
    const libro = await Libro.findOne({ _id: idLibro, idUsuario: idUsu });
    if (!libro) {
        throw new BookNotFoundError();
    }
    const libroEncontrado = libroDto(libro)
    return libroEncontrado;
}

export const actualizarLibro = async (idLibro, idUsu, nuevaData) => {
    try {
        const book = await Libro.findOneAndUpdate(
            { _id: idLibro, idUsuario: idUsu },
            nuevaData,
            {returnDocument: "after",runValidator:true}
        );
        if (!book) {
            throw new BookNotFoundError();
        }
    }catch(error) {
        throw error; 
    }
}
export const eliminarLibroService = async (idLibro, idUsu) => {
    const book = await Libro.findOneAndDelete({ _id: idLibro, idUsuario: idUsu })
    if (!book) {
        throw new BookNotFoundError();
    }
}

export const generarRecomendacion = async (idUsu, idLibro) => {
    const libro = await Libro.findOne({ _id: idLibro, idUsuario: idUsu });
    if (!libro) {
        throw new BookNotFoundError();
    }
    const sugerencia = await sugerirLibro(libro);
    return sugerencia;
}  
