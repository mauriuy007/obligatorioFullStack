import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    imageUrl: { type: String, default: null },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Libro",
        required: true
    }
}, {
    timestamps: true,
    collection: "reviews"
})

const Review = mongoose.model("Review", reviewSchema)

export { Review }
