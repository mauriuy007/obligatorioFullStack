import Joi from "joi";

const UserSchema = Joi.object({
    nombre: Joi.string().trim().min(2).max(30).required().messages({
        "string.empty": "Debe ingresar un nombre"
    }),
    apellido: Joi.string().trim().min(2).max(30).required().messages({
        "string.empty": "Debe ingresar un apellido"
    }),
    nombreUsuario: Joi.string().trim().min(3).max(15).required().messages({
        "string.empty": "Debe ingresar un nombre de usuario",
        "string.max": "El nombre de usuario no puede superar los 15 caracteres"
    }),
    mail: Joi.string().email({
        minDomainSegments: 2,
    }).required().messages({
        "string.email": "Debe ingresar un email válido",
        "string.empty": "Debe ingresar un email"
    }),
    password: Joi.string().min(8).max(20).required().messages({
        "string.empty": "Debe ingresar una contraseña",
        "string.min": "La contraseña debe tener al menos 8 caracteres",
        "string.max": "La contraseña no puede superar los 20 caracteres"
    }),
    rol: Joi.string().valid("Usuario", "Admin").default("Usuario"),
    plan: Joi.string().trim().min(2).max(30).default("Plus")
})

export const validateCreateUser = (user) =>
    UserSchema.validate(user, { abortEarly: true });
