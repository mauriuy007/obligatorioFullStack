import Joi from "joi";
import { User } from "../models/User.js";
import { InvalidUserErrror } from "../errors/InvalidUserError.js";

export const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    const { error } = schema.validate(user);
    if (error) {
        throw new InvalidUserErrror(error.details[0].message);  
    }
}
