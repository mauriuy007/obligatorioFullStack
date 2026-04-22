import { Usuario } from "../models/user.model.js";

export const getUserById = async (idUsuario) => {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    return usuario;
};
