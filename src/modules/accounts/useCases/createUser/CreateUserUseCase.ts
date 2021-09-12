import {inject, injectable} from "tsyringe";
import IUsersRepository from "../../repositories/contracts/IUsersRepository";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import User from "../../entities/User";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    execute({name, email, password, driver_license}: ICreateUserDTO): Promise<User> {
        return  this.usersRepository.create({
            name,
            email,
            password,
            driver_license
        });
    }
}

export default CreateUserUseCase;
