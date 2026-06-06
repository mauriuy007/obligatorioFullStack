import { obtenerEstadisticasUsuarioService, obtenerEstadisticasAdminService } from "../services/stats.service.v1.js";

export const obtenerEstadisticasUsuario = async (req, res) => {
    try {
        const idUsu = req.idUsuario;
        const estadisticas = await obtenerEstadisticasUsuarioService(idUsu);
        res.status(200).json(estadisticas);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
};

export const obtenerEstadisticasAdmin = async (req, res) => {
    try {
        const estadisticas = await obtenerEstadisticasAdminService();
        res.status(200).json(estadisticas);
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message || "Error del lado del servidor" });
    }
};
