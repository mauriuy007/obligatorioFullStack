const adminAuthorizationMiddleware = (req, res, next) => {
    if (req.rolUsuario !== "Admin") {
        return res.status(403).json({
            error: "Acceso denegado. Solo disponible para usuarios Admin"
        });
    }

    next();
};

export { adminAuthorizationMiddleware };
