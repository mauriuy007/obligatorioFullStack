const reviewDto = (review) => {
    return {
        id: review._id,
        calificacion: review.calificacion,
        comentario: review.comentario,
        urlImagen: review.urlImagen,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt
    }
}

export { reviewDto }