export class ReviewNotFoundError extends Error {
    constructor() {
        super("No se encontraron reviews");
        this.code = 404;
    }
}
