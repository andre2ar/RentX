import IUsersRepository from "../contracts/IUsersRepository";
import User from "../../entities/User";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import {getRepository, Repository} from "typeorm";

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
