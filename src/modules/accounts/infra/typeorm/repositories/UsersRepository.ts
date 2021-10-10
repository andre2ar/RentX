import {getRepository, Repository} from "typeorm";
import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import User from "@modules/accounts/infra/typeorm/entities/User";
import IUsersRepository from "@modules/accounts/repositories/contracts/IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({id, name, email, password, driver_license, avatar}: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            id,
            name,
            email,
            password,
            driver_license,
            avatar
        });

        await this.repository.save(user);

        return user;
    }

    findByEmail(email: string): Promise<User> {
        return this.repository.findOne({email});
    }

    findById(id: string): Promise<User> {
        return this.repository.findOne(id);
    }
}

export default UsersRepository;
