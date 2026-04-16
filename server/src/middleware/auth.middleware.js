import jwt from "jsonwebtoken"

const authMiddleware = (req,res, next) => {
    const token = req.headers.authorization

    if(!token){
        res.status(401).json({ message: "Debe enviar un token" })
        return;
    }

    try{
        const tokenEnviado = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.idUsuario = tokenEnviado.idUsuario
        next()
    } catch (e){
        res.status(401).json({ message: "Tojen inválido" })
    }
}

export { authMiddleware }