declare namespace Express {
    import User from "../../modules/accounts/infra/typeorm/entities/User";

    export interface Request {
        user: User;
    }
}
