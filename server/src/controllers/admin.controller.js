import { obtenerInfoAdmin } from "../services/admin.service.v1.js";
import { obtenerLibrosService, obtenerReviewsService, obtenerUsuariosService } from "../services/admin.service.v1.js";

export const obtenerAdmin = async (req, res) => {
    try {
        const admin = await obtenerInfoAdmin();
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: "Error del lado del servidor" });
    }
};

export const obtenerLibros = async (req,res) => {
    try{
        const librosUsuarios = await obtenerLibrosService();
        res.status(200).json(librosUsuarios)
    }catch(e){
        res.status(e.code).json({ error: e.error })
    }

};

export const obtenerReviews = async (req, res) => {
    try{
        const reviewsUsuarios = await obtenerReviewsService();
        res.status(200).json(reviewsUsuarios)
    }catch(e){
        res.status(e.code).json({ error: e.error })
    }
};

export const obtenerUsuarios = async (req, res) => {
    try{
        const listaUsuarios = await obtenerUsuariosService();
        res.status(200).json(listaUsuarios)
    }catch(e){
        res.status(e.code).json({ error: e.error })
    }
}