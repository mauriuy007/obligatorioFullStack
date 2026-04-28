export class InvalidBookError extends Error {
    constructor() {
        super("Revise la información enviada");
        this.code = 404;
    }
}
