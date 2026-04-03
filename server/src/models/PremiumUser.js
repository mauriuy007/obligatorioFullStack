export class PremiumUser extends User {
    constructor(id, name, email, password, subscriptionDate) {
        super(id, name, email, password);
        this.subscriptionDate = subscriptionDate;
    }
}