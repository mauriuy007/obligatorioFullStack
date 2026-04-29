import { cambiarPlan } from "../services/user.service.v1.js";


const pasarAPremium = async (req, res) => {
    try {
        const usuarioActualizado = await cambiarPlan(req.idUsuario);
        res.status(200).json(usuarioActualizado);
    } catch (e) {
        res.status(e.code).json({ message: e.message });
    }
}

export { pasarAPremium }