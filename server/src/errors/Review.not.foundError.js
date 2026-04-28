export class ReviewNotFoundError extends Error {
    constructor() {
        super("No se encontró la review");
        this.code = 404;
    }
}
