export class wrongFileTypeError extends Error {
    constructor(){
        super("Debe ser un archivo de imagen");
        this.code = 400;
    }
}