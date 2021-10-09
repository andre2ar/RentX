import User from "@modules/accounts/entities/User";
import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export default IUsersRepository;
