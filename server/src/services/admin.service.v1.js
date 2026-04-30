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

export const obtenerLibrosService = async () => {
    const librosTodos = await Libro.find();

    if(!librosTodos){
        throw new BookNotFoundError();
    }

    return librosTodos;
};

export const obtenerReviewsService = async () => {
    const reviewsTodas = await Review.find();

    if(!reviewsTodas){
        throw new ReviewNotFoundError();
    }

    return reviewsTodas; 
};

export const obtenerUsuariosService = async () => {
    const usuariosTodos = await Usuario.find({
        rol : "Usuario"
    });

    if(!usuariosTodos){
        throw new userNotFoundError();
    }

    return usuariosTodos;
}
