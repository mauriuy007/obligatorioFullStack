const reviewDto = (review) => {
    return {
        id: review._id,
        idLibro: review.idLibro,
        calificacion: review.calificacion,
        comentario: review.comentario,
        urlImagen: review.urlImagen,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt
    }
}

export { reviewDto }