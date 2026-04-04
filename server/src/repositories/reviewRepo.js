import {ReviewSchema} from '../schemas/reviewSchema.js';

export const getReviews = async () => {
    try {
        const reviews = await ReviewSchema.find();
        return reviews;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw error;
    }
}

export const createReview = async (reviewData) => {
    try {
        const newReview = new ReviewSchema(reviewData);
        await newReview.save();
        return newReview;
    } catch (error) {
        console.error("Error creating review:", error);
        throw error;
    }   
}

export const getReviewById = async (id) => {
    try {
        const review = await ReviewSchema.findById(id);
        return review;
    } catch (error) {
        console.error("Error fetching review by ID:", error);
        throw error;
    }
}