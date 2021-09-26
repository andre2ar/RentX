import {Request, Response} from "express";
import {container} from "tsyringe";
import CreateUserUseCase from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, driver_license } = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);

        const user = await createUserUseCase.execute({
            name,
            email,
            password,
            driver_license
        });

        delete user.password;

        return response.status(201).json(user);
    }
}

export default CreateUserController;
