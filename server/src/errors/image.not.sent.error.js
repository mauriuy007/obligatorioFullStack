export class NoImageError extends Error {
    constructor(){
        super("Debe enviar una imagen");
        this.code = 400;
    }
}