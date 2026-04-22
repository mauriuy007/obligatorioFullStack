import { getAdminData } from "../services.js/admin.service.v1.js";

const obtenerAdmin = async (req, res) => {
    try {
        const adminData = await getAdminData();
        res.status(200).json(adminData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export { obtenerAdmin };
