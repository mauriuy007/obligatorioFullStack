export class ReviewExistsError extends Error{
    constructor(){
        super("El usuario ya tiene una reseña para este libro");
        this.code = 409;
    }
}