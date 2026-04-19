export class BookNotFoundError extends Error {
    constructor() {
        super("Book not found", code = 404);
    }
}