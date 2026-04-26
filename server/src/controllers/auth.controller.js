import { dologin as loginService, registrarUsuario } from "../services/auth.service.v1.js"
import { upgradeUserToPremium } from "../services/user.service.v1.js";

const login = async (req, res) => {
    try{
        const token = await loginService(req.body)
        res.status(200).json(token)
    }catch(e){
        res.status(401).json({ message: e.message })
    }
}

const registrar = async (req, res) => {
    try{
        const usuarioNuevo = await registrarUsuario(req.body)
        res.status(201).json(usuarioNuevo)
    }catch (e){
        res.status(401).json({ message: e.message })
    }
}

export { login, registrar }
