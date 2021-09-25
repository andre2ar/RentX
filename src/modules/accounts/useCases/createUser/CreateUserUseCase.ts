import {inject, injectable} from "tsyringe";
import IUsersRepository from "../../repositories/contracts/IUsersRepository";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import User from "../../entities/User";
import {hash} from "bcrypt";
import AppError from "../../../../errors/AppError";

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

        const user = await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        });

        delete user.password;

        return user;
    }
}

export default CreateUserUseCase;
