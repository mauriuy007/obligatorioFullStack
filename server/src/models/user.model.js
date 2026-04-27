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
        enum: ["Usuario", "Admin"],
        default: "Usuario"
    },
    plan: { type: String, required: true, default: "Plus" }
},{
    timestamps: true,
    collection: "usuarios"
})

const Usuario = mongoose.model("Usuario", userSchema)

export { Usuario }
