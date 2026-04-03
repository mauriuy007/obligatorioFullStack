export class InvalidBookError extends Error {
    constructor(message) {
        super(message) = "Incorrect data for book";
        this.name = "InvalidBookError";
    }}