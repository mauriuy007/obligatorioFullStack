export class ReviewNotFoundError extends Error {
    constructor() {
        super("Review not found");
        this.code = 404;
    }
}
