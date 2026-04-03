export class InvalidReviewError extends Error {
    constructor(message) {
        super(message) = "Incorrect data for review";
        this.name = "InvalidReviewError";
    }
}