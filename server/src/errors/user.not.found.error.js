export class userNotFoundError extends Error {
    constructor(){
        super("No se encontraron usuarios");
        this.code = 404;
    }
}