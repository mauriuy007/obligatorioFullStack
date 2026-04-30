class InvalidUserPlan extends Error {
    constructor() {
        super("El usuario ya tiene plan Premium");
        this.code = 409; 
    }
}

export { InvalidUserPlan }