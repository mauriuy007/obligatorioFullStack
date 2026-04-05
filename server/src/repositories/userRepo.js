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

export const getUserByEmail = async (email) => {
    try {
        const user = await UserSchema.findOne({ email });
        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }   
}

export const getUserById = async (id) => {
    try {
        const user = await UserSchema.findById(id);
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }   
}

