import { Libro } from "../models/book.model.js"
import { Review } from "../models/review.model.js"
import { Usuario } from "../models/user.model.js"
import { BookNotFoundError } from "../errors/book.not.found.error.js"
import { ReviewNotFoundError } from "../errors/review.not.foundError.js"
import { userNotFoundError } from "../errors/user.not.found.error.js"

export const obtenerInfoAdmin = async () => {
    return {
        message: "Bienvenido al panel de administracion"
    };
};

export const obtenerLibrosService = async (limite, pagina) => {
    pagina = Number(pagina)
    limite = Number(limite)
    const total = await Libro.countDocuments()
    const skip = (pagina -1)*limite

    try{
    const librosTodos = await Libro.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limite);

    return {librosTodos, limite, total, totalPaginas: Math.ceil(total/limite)};
    }catch(e){
        throw new BookNotFoundError();
    }
};

export const obtenerReviewsService = async (limite, pagina) => {
    pagina = Number(pagina)
    limite = Number(limite)
    const total = await Libro.countDocuments()
    const skip = (pagina -1)*limite

    try{
    const reviewsTodas = await Review.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limite);

    return { reviewsTodas, limite, total, totalPaginas: Math.ceil(total/limite) };
    }catch(e){
        throw new ReviewNotFoundError();
    }
};

export const obtenerUsuariosService = async (limite, pagina) => {
    pagina = Number(pagina)
    limite = Number(limite)
    const total = await Libro.countDocuments()
    const skip = (pagina -1)*limite

    try{
        const usuariosTodos = await Usuario.find({
            rol : "Usuario"
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limite);

        return {usuariosTodos, limite, total, totalPaginas: Math.ceil(total/limite)};
    }catch(e){
        throw new userNotFoundError();
    }
}
