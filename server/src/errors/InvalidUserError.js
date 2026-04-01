export class InvalidUserErrror extends Error {
    constructor(message) {
        super(message) = "Incorrect data from user";
        this.name = "InvalidUserError";
    }
}