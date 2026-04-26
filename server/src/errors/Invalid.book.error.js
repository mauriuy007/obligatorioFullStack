export class InvalidBookError extends Error {
    constructor() {
        super("Invalid data. Please check");
        this.code = 404;
    }
}
