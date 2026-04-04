import { createUser as createUserInDB } from "../repositories/userRepo.js";

export const loginUser = (_req, res) => {
    res.status(501).json({ error: "Method not implemented" });
};

export const registerUser = async (req, res) => {
    try {
        const newUser = await createUserInDB(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
