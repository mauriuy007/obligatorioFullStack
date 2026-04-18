import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { type: String, required: true },
    calificacion: { type: Number },
    comentario: { type: String },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
}, {
    timestamps: true.valueOf,
    collection: "libros"
})

const Libro = mongoose.model("Libro", bookSchema)

export { Libro }