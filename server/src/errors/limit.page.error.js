export class missingLimitPageError extends Error {
    constructor(){
        super("Debe ingresar pagina y limite");
        this.code = 400;
    }
}