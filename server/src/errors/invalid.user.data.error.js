class invalidUserDataError extends Error {
    constructor() {
        super("La información enviada no es válida");
        this.code = 403;
    }
}

export { invalidUserDataError }