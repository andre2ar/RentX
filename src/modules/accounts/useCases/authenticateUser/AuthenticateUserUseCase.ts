import {inject, injectable} from "tsyringe";
import IUsersRepository from "../../repositories/contracts/IUsersRepository";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";
import User from "../../entities/User";

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
            throw new Error("Email or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch) {
            throw new Error("Email or password incorrect");
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
