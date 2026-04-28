class invalidUserDataError extends Error {
    constructor() {
        super("La información enviada no es válida");
    }
}

export { invalidUserDataError }