const libroDto = (libro) => {
    return {
        id: libro._id,
        titulo: libro.titulo,
        autor: libro.autor,
        genero: libro.genero,
        descripcion: libro.descripcion,
        estado: libro.estado,
        createdAt: libro.createdAt,
        updatedAt: libro.updatedAt
    }
}

export { libroDto }