import { v2 as cloudinary } from "cloudinary";
import { Review } from "../models/review.model.js";
import { Libro } from "../models/book.model.js";
import { BookNotFoundError } from "../errors/book.not.found.error.js";
import { ReviewNotFoundError } from "../errors/review.not.foundError.js"
import { ImageUploadError } from "../errors/image.upload.error.js";
import { reviewDto } from "../dtos/review.dto.js";
import { ReviewExistsError } from "../errors/review.exists.error.js";
import mongoose from "mongoose";

const configCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    return cloudinary;
};

export const crearReviewService = async ({ calificacion, comentario }, idLibro, idUsu) => {
    const libro = await Libro.findOne({ _id: idLibro, idUsuario: idUsu });
    const existeReview = await Review.findOne({ idLibro: idLibro, idUsuario: idUsu });

    if (!libro) {
        throw new BookNotFoundError();
    }

    if(existeReview){
        throw new ReviewExistsError();
    }

    const nuevaReview = {
        calificacion,
        comentario,
        idUsuario: idUsu,
        idLibro,
        urlImagen: null
    };

    const guardarReview = await Review.create(nuevaReview);
    const devolverReview = reviewDto(guardarReview);

    return devolverReview;
};

export const obtenerReviewsService = async(limite, pagina, idUsu) => {
    const query = { idUsuario: idUsu }
    const total = await Review.countDocuments(query)
    pagina = Number(pagina)
    limite = Number(limite)
    const skip = (pagina -1) * limite

    try{
        const reviews = await Review.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limite);
        return { reviews, limite, total, totalPaginas: Math.ceil(total/limite) }
    }catch(error){
        throw new ReviewNotFoundError();
    }
}

export const obtenerReviewPorLibro = async (idLibro, idUsu, limite, pagina, rating) => {
    const libro = await Libro.findOne({ _id: idLibro, idUsuario: idUsu });
    if (!libro) {
        throw new BookNotFoundError();
    }

    const query = { idLibro : idLibro }
    const total= await Review.countDocuments(query)
    pagina = Number(pagina)
    limite = Number(limite)
    const skip = (pagina -1 ) * limite

    if(rating){
        query.rating = Number(rating)
    }

    try{
        const reviews = await Review.find(query)
        .sort({ createdAt: -1})
        .skip(skip)
        .limit(limite);

        return { reviews, limite, total, totalPaginas: Math.ceil(total/limite) }
    }catch (error){
        throw new ReviewNotFoundError();
    }
};

export const agregarImagen = async (img, reviewId, idUsu) => {
    const review = await Review.findOne({ _id: reviewId, idUsuario: idUsu });

    if (!review) {
        throw new ReviewNotFoundError();
    }

    const cloudinaryClient = configCloudinary();
    const imageBase64 = Buffer.from(img.buffer).toString("base64");
    const uri = `data:${img.mimetype};base64,${imageBase64}`;

    let resultado;

    try {
        resultado = await cloudinaryClient.uploader.upload(uri);
    } catch (error) {
        throw new ImageUploadError();
    }

    review.urlImagen = resultado.secure_url;
    return await review.save();
};

export const eliminarReview = async (reviewId, idUsu) => {
    const review = await Review.findOneAndDelete({ _id: reviewId, idUsuario:idUsu });
    if(!review){
        throw new ReviewNotFoundError();
    }
}