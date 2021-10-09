import {inject, injectable} from "tsyringe";
import {hash} from "bcrypt";
import AppError from "@errors/AppError";
import IUsersRepository from "@modules/accounts/repositories/contracts/IUsersRepository";
import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import User from "@modules/accounts/entities/User";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({name, email, password, driver_license}: ICreateUserDTO): Promise<User> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists) {
            throw new AppError("User Already exists");
        }

        const passwordHash = await hash(password, 8);

        return await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        });
    }
}

export default CreateUserUseCase;
