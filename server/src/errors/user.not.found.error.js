export class UserNotFoundError extends Error {
    constructor(){
        super("No se encontraron usuarios");
        this.code = 404;
    }
}