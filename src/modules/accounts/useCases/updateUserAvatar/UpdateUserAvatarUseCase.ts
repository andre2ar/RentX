import {inject, injectable} from "tsyringe";
import {deleteFile} from "@shared/utils/file";
import User from "@modules/accounts/infra/typeorm/entities/User";
import IUsersRepository from "@modules/accounts/repositories/contracts/IUsersRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({user_id, avatar_file}: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if(user.avatar) {
            await deleteFile(`./uploads/avatar/${user.avatar}`);
        }

        user.avatar = avatar_file;

        return await this.usersRepository.create(user);
    }
}

export default UpdateUserAvatarUseCase;
