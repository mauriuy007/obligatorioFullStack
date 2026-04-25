import { Usuario } from "../models/user.model.js";
import { usuarioDto } from "../dtos/usuario.dto.js";

export const getUserById = async (idUsuario) => {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    return usuario;
};

export const upgradeUserToPremium = async (idUsuario) => {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    if (usuario.rol === "Admin") {
        return usuarioDto(usuario);
    }

    usuario.rol = "Premium";
    usuario.plan = "Premium";
    await usuario.save();

    return usuarioDto(usuario);
};
