const reviewDto = (review) => {
    return {
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        imageUrl: review.imageUrl,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt
    }
}

export { reviewDto }