export class GoogleBooksServiceError extends Error {
    constructor() {
        super("El servicio externo de Google Books no está disponible");
        this.code = 503;
    }
}
