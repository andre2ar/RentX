import IUsersRepository from "../contracts/IUsersRepository";
import User from "../../entities/User";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import {getRepository, Repository} from "typeorm";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({name, email, password, driver_license}: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license
        });

        await this.repository.save(user);

        return user;
    }

    findByEmail(email: string): Promise<User> {
        return this.repository.findOne({email});
    }
}

export default UsersRepository;
