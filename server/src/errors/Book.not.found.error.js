export class BookNotFoundError extends Error {
    constructor() {
        super("Hubo un error al buscar el o los libros");
        this.code = 404;
    }
}
