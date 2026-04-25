import { createReview, getReviewsByBookId, uploadReviewImage } from "../services/review.service.v1.js";

export const crearReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const userId = req.idUsuario;
        const bookId = req.params.bookId;
        const review = await createReview({ rating, comment }, bookId, userId);

        res.status(201).json(review);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message || "Internal server error" });
    }
};

export const obtenerReviewsPorLibro = async (req, res) => {
    try {
        const userId = req.idUsuario;
        const bookId = req.params.bookId;
        const reviews = await getReviewsByBookId(bookId, userId);

        if (!reviews || reviews.length === 0) {
            return res.status(204).json({ message: "No reviews found for this book" });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message || "Internal server error" });
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
        res.status(error.code || 500).json({ message: "error al subir imagen" });
    }
};
