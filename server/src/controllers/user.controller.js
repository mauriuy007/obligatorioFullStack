import { upgradeUserToPremium } from "../services/user.service.v1.js";


const pasarAPremium = async (req, res) => {
    try {
        const usuarioActualizado = await upgradeUserToPremium(req.idUsuario);
        res.status(200).json(usuarioActualizado);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}

export { pasarAPremium }