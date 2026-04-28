import { createReview, getReviewsByBookId, uploadReviewImage, eliminarReview } from "../services/review.service.v1.js";

export const crearReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const userId = req.idUsuario;
        const bookId = req.params.bookId;
        const review = await createReview({ rating, comment }, bookId, userId);

        res.status(201).json(review);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
};

export const obtenerReviewsPorLibro = async (req, res) => {
    try {
        const userId = req.idUsuario;
        const bookId = req.params.bookId;
        const { limit, page, rating } = req.query

        if(!limit || !page){
            res.status(400).json({ message: "page and limit are required" })
            return
        }

        const reviews = await getReviewsByBookId(bookId, userId, limit, page, rating);

        /*
        if (!reviews || reviews.length === 0) {
            return res.status(204).json({ message: "No reviews found for this book" });
        }
        */

        res.status(200).json(reviews);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
};

export const agregarImagenReview = async (req, res) => {
    const image = req.file;
    const reviewId = req.params.id;

    if (!image) {
        return res.status(400).json({ message: "no se envió imagen" });
    }

    if (!image.mimetype.startsWith("image/")) {
        return res.status(400).json({ message: "debe ser un archivo de imagen" });
    }

    try {
        const userId = req.idUsuario;
        const review = await uploadReviewImage(image, reviewId, userId);

        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({ error: error.message });
    }
};

export const borrarReview = async (req, res) => {
    try{
        const reviewId = req.params.id;
        const userId = req.idUsuario;
        await eliminarReview(reviewId, userId);
        res.status(204).send();
    }catch(error){
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor"});
    }
}
