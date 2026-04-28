class errorLimiteLibros extends Error {
    constructor(message = "Los usuarios Plus solo pueden registrar hasta 4 libros"){
        super(message);
        this.code = 403;
    }
}

export { errorLimiteLibros }