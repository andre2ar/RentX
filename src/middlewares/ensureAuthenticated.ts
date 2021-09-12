import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("Token missing");
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = verify(token, process.env.JWT_TOKEN);
    } catch {
        throw new Error("Invalid token");
    }
}