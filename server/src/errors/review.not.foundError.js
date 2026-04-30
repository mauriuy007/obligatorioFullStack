export class ReviewNotFoundError extends Error {
    constructor() {
        super("No se encontró la o las reviews");
        this.code = 404;
    }
}
