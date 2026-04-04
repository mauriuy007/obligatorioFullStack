import { improveReview } from "../services.js/geminiService.js";
import {
    createReview as createReviewInDB,
    getReviewById as getReviewByIdFromDB,
    getReviews as getReviewsFromDB,
} from "../repositories/reviewRepo.js";

export const createReview = async (req, res) => {
    try {
        if (!req.body || !req.body.content) {
            return res.status(400).json({ error: "Content is required" });
        }

        const improvedContent = await improveReview(req.body.content);
        const reviewData = {
            ...req.body,
            content: improvedContent,
        };

        const newReview = await createReviewInDB(reviewData);
        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getReviews = async (_req, res) => {
    try {
        const reviews = await getReviewsFromDB();
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await getReviewByIdFromDB(id);

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error("Error fetching review by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateReview = (_req, res) => {
    res.status(501).json({ error: "Method not implemented" });
};

export const deleteReview = (_req, res) => {
    res.status(501).json({ error: "Method not implemented" });
};
