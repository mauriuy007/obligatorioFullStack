import { noImageError } from "../errors/image.not.sent.error.js";
import { missingLimitPageError } from "../errors/limit.page.error.js";
import { wrongFileTypeError } from "../errors/wrong.file.type.error.js";
import { crearReviewService, obtenerReviewPorLibro, agregarImagen, eliminarReview, obtenerReviewsService } from "../services/review.service.v1.js";

export const crearReview = async (req, res) => {
    try {
        const { calificacion, comentario } = req.body;
        const idUsu = req.idUsuario;
        const idLibro = req.params.idLibro;
        const review = await crearReviewService({ calificacion, comentario }, idLibro, idUsu);

        res.status(201).json(review);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
};

export const obtenerReviews = async(req,res) => {
    try{
        const idUsu = req.idUsuario;
        const { limite, pagina } = req.query

        if(!limite || !pagina){
            res.status(400).json({ message:"Debe ingresar página y límite" })
            return
        }
        const reviews = await obtenerReviewsService(limite, pagina, idUsu);
        res.status(200).json(reviews);
    }catch(error){
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
};

export const obtenerReviewsPorLibro = async (req, res) => {
    try {
        const idUsu = req.idUsuario;
        const idLibro = req.params.idLibro;
        const { limite, pagina, rating } = req.query

        if(!limite || !pagina){
            throw new missingLimitPageError();
        }

        const reviews = await obtenerReviewPorLibro(idLibro, idUsu, limite, pagina, rating);

        res.status(200).json(reviews);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
};

export const agregarImagenReview = async (req, res) => {
    const img = req.file;
    const reviewId = req.params.id;

    if (!img) {
        throw new noImageError();
    }

    if (!img.mimetype.startsWith("image/")) {
        throw new wrongFileTypeError();
    }

    try {
        const idUsu = req.idUsuario;
        const review = await agregarImagen(img, reviewId, idUsu);

        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({ error: error.message });
    }
};

export const borrarReview = async (req, res) => {
    try{
        const reviewId = req.params.id;
        const idUsu = req.idUsuario;
        await eliminarReview(reviewId, idUsu);
        res.status(204).send();
    }catch(error){
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor"});
    }
}
