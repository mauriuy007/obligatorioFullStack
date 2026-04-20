import Joi from "joi";
import { Usuario } from "../models/user.model.js"

const UserSchema = Joi.object({
    nombre: Joi.string().trim().min(2).max(30).required(),
    apellido: Joi.string().trim().min(2).max(30).required(),
    nombreUsuario: Joi.alphanum().trim().min(3).max(15).required(),
    mail: Joi.string().email({
        minDomainSegments: 2,
    }).required(),
    password: Joi.string().pattern(new RegExp('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_\-])[A-Za-z\d@$!%*?&.#_\-]{8,}$/')).min(8).max(20).required(),
    rol: Joi.string().required(),
    plan: Joi.string().required()
})

export const validateCreateUser = (user) =>
    UserSchema.validate(user, { abortEarly: true });