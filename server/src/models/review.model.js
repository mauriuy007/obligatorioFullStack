import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    calificacion: { type: Number, required: true },
    comentario: { type: String },
    urlImagen: { type: String, default: null },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    idLibro: {
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
