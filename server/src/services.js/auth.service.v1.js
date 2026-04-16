import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Usuario } from "../models/user.model.js"
import { usuarioDto } from "../dtos/usuario.dto.js"

const login = async ({usuario, contra}) => {
    const user = await Usuario.findOne({ nombreUsuario: usuario })
    if (user){
        const contraValida = await bcrypt.compare(contra, user.password)
        if(contraValida){
            const token = jwt.sign(
                { idUsu: user.id, rolUsu: user.rol },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            )
            return { token }
        }
    }

    throw new Error("No autorizado")
}

const registrarUsuario = async ({ nombreUsuario, nombre, apellido, password, mail,  }) => {
    const contraHasheada = await bcrypt.hash(password, 10);

    const nuevoUsuario = {
        nombreUsuario,
        nombre,
        apellido,
        password: contraHasheada,
        mail,
        rol: "usuario",
        plan: "Plus"
    }

    const guardarUsu = await Usuario.create(nuevoUsuario);
    const devolverUsuario = usuarioDto(guardarUsu);

    return devolverUsuario;
}

export { login, registrarUsuario }