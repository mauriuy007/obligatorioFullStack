import Joi from "joi";

const UserSchema = Joi.object({
    nombre: Joi.string().trim().min(2).max(30).required(),
    apellido: Joi.string().trim().min(2).max(30).required(),
    nombreUsuario: Joi.alphanum().trim().min(3).max(15).required(),
    mail: Joi.string().email({
        minDomainSegments: 2,
    }).required(),
    password: Joi.string().min(8).max(20).required(),
    rol: Joi.string().valid("Basico", "Premium", "Admin").default("Basico"),
    plan: Joi.string().trim().min(2).max(30).default("Basico")
})

export const validateCreateUser = (user) =>
    UserSchema.validate(user, { abortEarly: true });
