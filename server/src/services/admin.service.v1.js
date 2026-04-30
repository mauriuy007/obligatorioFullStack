import { Libro } from "../models/book.model.js"
import { Review } from "../models/review.model.js"
import { Usuario } from "../models/user.model.js"

export const obtenerInfoAdmin = async () => {
    return {
        message: "Bienvenido al panel de administracion"
    };
};

export const obtenerLibrosService = async () => {
    const librosTodos = await Libro.find();
    return librosTodos;
};

export const obtenerReviewsService = async () => {
    const reviewsTodas = await Review.find();
    return reviewsTodas; 
};

export const obtenerUsuariosService = async () => {
    const usuariosTodos = await Usuario.find({
        rol : "Usuario"
    });
    return usuariosTodos;
}
