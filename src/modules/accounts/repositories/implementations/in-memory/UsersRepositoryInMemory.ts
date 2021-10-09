import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import User from "@modules/accounts/entities/User";
import IUsersRepository from "@modules/accounts/repositories/contracts/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository{
    users: User[] = [];

    async create({email, name, password, driver_license}: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {
            email,
            name,
            password,
            driver_license
        });

        this.users.push(user);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }
}

export default UsersRepositoryInMemory;
