import {UserSchema} from '../models/userModel.js';

export const createUser = async (userData) => {
    try {
        const newUser = new UserSchema(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }   
}

