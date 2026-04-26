import { v2 as cloudinary } from "cloudinary";
import { Review } from "../models/review.model.js";
import { Libro } from "../models/book.model.js";
import { BookNotFoundError } from "../errors/BookNotFoundError.js";
import { ReviewNotFoundError } from "../errors/ReviewNotFoundError.js";
import { ImageUploadError } from "../errors/ImageUploadError.js";

const configureCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    return cloudinary;
};

export const createReview = async ({ rating, comment }, bookId, userId) => {
    const book = await Libro.findOne({ _id: bookId, idUsuario: userId });

    if (!book) {
        throw new BookNotFoundError();
    }

    const newReview = {
        rating,
        comment,
        userId,
        bookId,
        imageUrl: null
    };

    return await Review.create(newReview);
};

export const getReviewsByBookId = async (bookId, userId, limit, page, rating) => {
    const book = await Libro.findOne({ _id: bookId, idUsuario: userId });
    if (!book) {
        throw new BookNotFoundError();
    }

    const query = { bookId : bookId }
    const total= await Review.countDocuments(query)
    page = Number(page)
    limit = Number(limit)
    const skip = (page -1 ) * limit

    if(rating){
        query.rating = Number(rating)
    }

    try{
        const reviews = await Review.find(query)
        .sort({ createdAt: -1})
        .skip(skip)
        .limit(limit);

        return { reviews, limit, total, totalPages: Math.ceil(total/limit) }
    }catch (error){
        throw new Error("error fetching books")
    }
};

export const uploadReviewImage = async (image, reviewId, userId) => {
    const review = await Review.findOne({ _id: reviewId, userId });

    if (!review) {
        throw new ReviewNotFoundError();
    }

    const cloudinaryClient = configureCloudinary();
    const imageBase64 = Buffer.from(image.buffer).toString("base64");
    const uri = `data:${image.mimetype};base64,${imageBase64}`;

    let result;

    try {
        result = await cloudinaryClient.uploader.upload(uri, {
            folder: "reviews"
        });
    } catch (error) {
        throw new ImageUploadError();
    }

    review.imageUrl = result.secure_url;
    return await review.save();
};
