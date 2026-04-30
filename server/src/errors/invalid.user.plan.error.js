class invalidUserPlan extends Error {
    constructor() {
        super("El usuario ya tiene plan Premium");
        this.code = 409; 
    }
}

export { invalidUserPlan }