class invalidUserPlan extends Error {
    constructor() {
        super("El user ya tiene plan Premium");
        this.code = 400; 
    }
}

export { invalidUserPlan }