export class AlreadyRegisteredUserError extends Error{
    constructor(){
        super("El usuario ya está registrado"),
        this.code = 409;
    }
}