export const createReview = (req, res) => {
    res.json({ message: "Create a review" });
}

export const getReviews = (req, res) => {
    res.json({ message: "Get all reviews" });
}

export const getReviewById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get review with id ${id}` });
}

export const updateReview = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Update review with id ${id}` });
}

export const deleteReview = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Delete review with id ${id}` });
}