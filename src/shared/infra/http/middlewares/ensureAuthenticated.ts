import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";
import AppError from "@shared/errors/AppError";
import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
    iat: number;
    exp: number;
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    let userId = null;
    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
        userId = sub;
    } catch {
        throw new AppError("Invalid token", 401);
    }

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if(!user) {
        throw new AppError("User not found", 401);
    }

    delete user.password;
    request.user = user;

    next();
}
