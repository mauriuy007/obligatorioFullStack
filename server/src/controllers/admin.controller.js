import { missingLimitPageError } from "../errors/limit.page.error.js";
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
        const { limite, pagina } = req.query

        if(!limite || !pagina){
            throw new missingLimitPageError();
        }
        const librosUsuarios = await obtenerLibrosService(limite, pagina);
        res.status(200).json(librosUsuarios)
    }catch(e){
        console.log(e)
        res.status(e.code).json({ error: e.message })
    }

};

export const obtenerReviews = async (req, res) => {
    try{
    const {limite, pagina} = req.query

    if(!limite || !pagina){
        throw new missingLimitPageError();
    }
        const reviewsUsuarios = await obtenerReviewsService(limite, pagina);
        res.status(200).json(reviewsUsuarios)
    }catch(e){
        res.status(e.code).json({ error: e.message })
    }
};

export const obtenerUsuarios = async (req, res) => {
    try{
        const {limite, pagina} = req.query

        if(!limite || !pagina){
            throw new missingLimitPageError();
        }
        const listaUsuarios = await obtenerUsuariosService(limite, pagina);
        res.status(200).json(listaUsuarios)
    }catch(e){
        res.status(e.code).json({ error: e.message })
    }
}