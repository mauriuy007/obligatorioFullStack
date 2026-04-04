import { improveReview} from "../services.js/geminiService.js";
import { createReview as createReviewInDB } from "../repositories/reviewRepo.js";
import { getReviews as getReviewsFromDB } from "../repositories/reviewRepo.js";
import { getReviewById as getReviewByIdFromDB } from "../repositories/reviewRepo.js";

export async function createReview(req, res) {
    if (!req.body || !req.body.content) {
        return res.status(400).json({ error: "Content is required" });
    }
    const { content } = req.body;
    const improvedContent =  await improveReview(content);
    res.json({ message: "Review created", improvedContent });
}

export const getReviews = (req, res) => {
    res.json({ message: "Get all reviews" });
}

export const getReviewById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get review with id ${id}` });
}

export const updateReview = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Update review with id ${id}` });
}

export const deleteReview = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Delete review with id ${id}` });
}