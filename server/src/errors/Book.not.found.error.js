export class BookNotFoundError extends Error {
    constructor() {
        super("Error fetching users books");
        this.code = 404;
    }
}
