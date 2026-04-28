import { obtenerInfoAdmin } from "../services/admin.service.v1.js";

const obtenerAdmin = async (req, res) => {
    try {
        const admin = await obtenerInfoAdmin();
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: "Error del lado del servidor" });
    }
};

export { obtenerAdmin };
