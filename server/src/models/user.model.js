import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: { type:String, required: true },
    apellido: { type: String, required: true },
    nombreUsuario: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: {
        type: String,
        required: true,
        enum: ["Basico", "Premium", "Admin"],
        default: "Basico"
    },
    plan: { type: String, required: true, default: "Basico" }
},{
    timestamps: true,
    collection: "usuarios"
})

const Usuario = mongoose.model("Usuario", userSchema)

export { Usuario }
