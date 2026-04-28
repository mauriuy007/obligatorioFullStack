export class GoogleBooksServiceError extends Error {
    constructor(message = "El servicio de Google Books no está disponible") {
        super(message);
        this.code = 503;
    }
}
