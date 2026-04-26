export class GoogleBooksServiceError extends Error {
    constructor(message = "Google Books service unavailable") {
        super(message);
        this.code = 503;
    }
}
