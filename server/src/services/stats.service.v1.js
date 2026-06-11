import { Libro } from "../models/book.model.js";
import { Review } from "../models/review.model.js";
import { Usuario } from "../models/user.model.js";

export const obtenerEstadisticasUsuarioService = async (idUsu) => {
    const [totalLibros, librosLeidos, librosLeyendo, librosPendientes, todosLibros, todasReviews] = await Promise.all([
        Libro.countDocuments({ idUsuario: idUsu }),
        Libro.countDocuments({ idUsuario: idUsu, estado: "Leido" }),
        Libro.countDocuments({ idUsuario: idUsu, estado: "Leyendo" }),
        Libro.countDocuments({ idUsuario: idUsu, estado: "Pendiente" }),
        Libro.find({ idUsuario: idUsu }).select("genero estado"),
        Review.find({ idUsuario: idUsu }).select("calificacion idLibro").populate("idLibro", "genero")
    ]);

    const ratioLeidos = totalLibros > 0 ? Number((librosLeidos / totalLibros).toFixed(2)) : 0;

    const librosPorEstado = [
        { estado: "Leido", total: librosLeidos },
        { estado: "Leyendo", total: librosLeyendo },
        { estado: "Pendiente", total: librosPendientes }
    ];

    const generoLibrosMap = {};
    for (const libro of todosLibros) {
        generoLibrosMap[libro.genero] = (generoLibrosMap[libro.genero] || 0) + 1;
    }
    const librosPorGenero = Object.entries(generoLibrosMap).map(([genero, total]) => ({ genero, total }));

    const generoReviewsMap = {};
    for (const review of todasReviews) {
        if (!review.idLibro) continue;
        const genero = review.idLibro.genero;
        if (!generoReviewsMap[genero]) {
            generoReviewsMap[genero] = { suma: 0, cantidad: 0 };
        }
        generoReviewsMap[genero].suma += review.calificacion;
        generoReviewsMap[genero].cantidad += 1;
    }
    const calificacionPromediaPorGenero = Object.entries(generoReviewsMap).map(([genero, { suma, cantidad }]) => ({
        genero,
        promedioCalificacion: Number((suma / cantidad).toFixed(2)),
        totalReviews: cantidad
    }));

    return {
        totalLibros,
        librosLeidos,
        ratioLeidos,
        librosPorEstado,
        librosPorGenero,
        calificacionPromediaPorGenero
    };
};

export const obtenerEstadisticasAdminService = async () => {
    const [totalUsuarios, totalLibros, totalLibrosLeidos] = await Promise.all([
        Usuario.countDocuments(),
        Libro.countDocuments(),
        Libro.countDocuments({ estado: "Leido" }),
    ]);
    return { totalUsuarios, totalLibros, totalLibrosLeidos };
};
