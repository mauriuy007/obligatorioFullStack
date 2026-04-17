class invalidUserDataError extends Error {
    constructor() {
        super("Invalid user data", { code: 400 });
    }
}