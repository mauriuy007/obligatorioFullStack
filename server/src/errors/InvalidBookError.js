export class InvalidBookError extends Error {
    constructor() {
        super("Book not found");
        this.code = 404;
    }
}
