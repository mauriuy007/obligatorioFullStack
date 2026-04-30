export class userNotFoundError extends Error {
    constructor(){
        super("No se encontró el o los usuarios");
        this.code = 404;
    }
}