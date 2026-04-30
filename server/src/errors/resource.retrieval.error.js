export class ResourceRetrievalError extends Error{
    constructor(){
        super("Error obteniendo el recurso");
        this.code = 500;
    }
}