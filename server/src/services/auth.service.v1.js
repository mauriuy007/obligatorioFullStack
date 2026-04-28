import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Usuario } from "../models/user.model.js"
import { usuarioDto } from "../dtos/usuario.dto.js"
import { validateCreateUser } from "../validators/user.validator.js"
import { invalidUserDataError } from "../errors/invalid.user.data.error.js"

const loginUsuario = async ({ nombreUsuario, contrasena }) => {
    const usuario = await Usuario.findOne({ nombreUsuario: nombreUsuario })
    if (usuario){
        const contraValida = await bcrypt.compare(contrasena, usuario.contrasena)
        if(contraValida){
            const token = jwt.sign(
                { idUsu: usuario._id, rolUsu: usuario.rol },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            )
            return { token }
        }
    }

    throw new invalidUserDataError();
}

const registrarUsuario = async ({ nombreUsuario, nombre, apellido, contrasena, mail, rol, plan }) => {
    const { error, value } = validateCreateUser({
        nombreUsuario,
        nombre,
        apellido,
        contrasena,
        mail,
        rol,
        plan
    });

    if (error) {
        throw new Error(error.details[0].message);
    }

    const contraHasheada = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = {
        nombreUsuario: value.nombreUsuario,
        nombre: value.nombre,
        apellido: value.apellido,
        contrasena: contraHasheada,
        mail: value.mail,
        rol: value.rol,
        plan: value.plan
    }

    const guardarUsu = await Usuario.create(nuevoUsuario);
    const devolverUsuario = usuarioDto(guardarUsu);
    const token = jwt.sign(
                { idUsu: guardarUsu._id, rolUsu: guardarUsu.rol },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );
            
    devolverUsuario.token = token;

    return devolverUsuario;
}

export { loginUsuario, registrarUsuario }
