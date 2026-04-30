export class GoogleBooksServiceError extends Error {
    constructor() {
        super("El servicio de Google Books no está disponible");
        this.code = 503;
    }
}
