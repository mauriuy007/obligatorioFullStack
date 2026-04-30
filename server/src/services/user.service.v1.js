import { Usuario } from "../models/user.model.js";
import { usuarioDto } from "../dtos/usuario.dto.js";
import { invalidUserPlan } from "../errors/invalid.user.plan.error.js";
import { userNotFoundError } from "../errors/user.not.found.error.js";

export const obtenerUsuarioPorId = async (idUsuario) => {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
        throw new userNotFoundError();
    }

    return usuario;
};

export const cambiarPlan = async (idUsuario) => {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
        throw new userNotFoundError();
    }

    if (usuario.rol === "Admin") {
        return usuarioDto(usuario);
    }

    if(usuario.plan === "Premium") {
        throw new invalidUserPlan();
    }

    usuario.plan = "Premium";
    await usuario.save();

    return usuarioDto(usuario);
};
