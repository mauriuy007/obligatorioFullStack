export class BookNotFoundError extends Error {
    constructor() {
        super("No se encontraron libros");
        this.code = 404;
    }
}
