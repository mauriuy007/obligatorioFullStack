import { Usuario } from "../models/user.model.js";
import { usuarioDto } from "../dtos/usuario.dto.js";
import { invalidUserDataError } from "../errors/invalid.user.data.error.js";
import { invalidUserPlan } from "../errors/invalid.user.plan.error.js";

export const obtenerUsuarioPorId = async (idUsuario) => {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
        throw new invalidUserDataError();
    }

    return usuario;
};

export const cambiarPlan = async (idUsuario) => {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
        throw new invalidUserDataError();
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
