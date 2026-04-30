class bookLimitError extends Error {
    constructor(){
        super("Los usuarios Plus solo pueden registrar hasta 4 libros");
        this.code = 403;
    }
}

export { bookLimitError }