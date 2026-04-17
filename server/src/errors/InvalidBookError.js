export class InvalidBookError extends Error {
    constructor() {
        super("Book not found", { code: 404 });
    }
}