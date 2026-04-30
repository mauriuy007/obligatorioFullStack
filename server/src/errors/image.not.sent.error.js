export class noImageError extends Error {
    constructor(){
        super("No se envió imagen");
        this.code = 400;
    }
}