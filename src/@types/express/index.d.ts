declare namespace Express {
    import User from "../../modules/accounts/entities/User";

    export interface Request {
        user: User;
    }
}
