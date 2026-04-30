class invalidUserDataError extends Error {
    constructor() {
        super("La información enviada no es válida");
        this.code = 400;
    }
}

export { invalidUserDataError }