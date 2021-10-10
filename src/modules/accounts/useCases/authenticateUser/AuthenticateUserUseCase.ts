import {inject, injectable} from "tsyringe";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";

import User from "@modules/accounts/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "@modules/accounts/repositories/contracts/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User,
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {
    }
    async execute({email, password}: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if(!user) {
            throw new AppError("Email or password incorrect", 401);
        }

        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch) {
            throw new AppError("Email or password incorrect", 401);
        }

        const token = sign({}, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: "1d"
        });

        delete user.password;

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserUseCase;
