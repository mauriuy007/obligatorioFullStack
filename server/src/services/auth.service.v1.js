import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Usuario } from "../models/user.model.js"
import { usuarioDto } from "../dtos/usuario.dto.js"
import { validateCreateUser } from "../validators/userValidator.js"

const dologin = async ({ nombreUsuario, password }) => {
    const user = await Usuario.findOne({ nombreUsuario: nombreUsuario })
    if (user){
        const contraValida = await bcrypt.compare(password, user.password)
        if(contraValida){
            const token = jwt.sign(
                { idUsu: user._id, rolUsu: user.rol },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            )
            return { token }
        }
    }

    throw new Error("No autorizado")
}

const registrarUsuario = async ({ nombreUsuario, nombre, apellido, password, mail, rol, plan }) => {
    const { error, value } = validateCreateUser({
        nombreUsuario,
        nombre,
        apellido,
        password,
        mail,
        rol,
        plan
    });

    if (error) {
        throw new Error(error.details[0].message);
    }

    const contraHasheada = await bcrypt.hash(password, 10);

    const nuevoUsuario = {
        nombreUsuario: value.nombreUsuario,
        nombre: value.nombre,
        apellido: value.apellido,
        password: contraHasheada,
        mail: value.mail,
        rol: value.rol,
        plan: value.plan
    }

    const guardarUsu = await Usuario.create(nuevoUsuario);
    const devolverUsuario = usuarioDto(guardarUsu);

    return devolverUsuario;
}

export { dologin, registrarUsuario }
