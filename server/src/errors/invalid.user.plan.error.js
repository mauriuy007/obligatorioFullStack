class invalidUserPlan extends Error {
    constructor() {
        super("El usuario ya tiene plan Premium");
        this.code = 400; 
    }
}

export { invalidUserPlan }