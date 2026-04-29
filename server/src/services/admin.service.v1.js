import { Libro } from "../models/book.model.js"
import { Review } from "../models/review.model.js"

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
