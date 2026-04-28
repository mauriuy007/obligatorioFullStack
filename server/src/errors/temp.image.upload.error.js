export class ImageUploadError extends Error {
    constructor() {
        super("Error al subir la imagen");
        this.code = 500;
    }
}
