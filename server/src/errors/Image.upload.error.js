export class ImageUploadError extends Error {
    constructor() {
        super("Error uploading image");
        this.code = 500;
    }
}
