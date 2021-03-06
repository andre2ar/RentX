import {Request, Response} from "express";
import {container} from "tsyringe";
import AuthenticateUserUseCase from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {password, email} = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

        const authenticationInfo = await authenticateUserUseCase.execute({password, email});

        return response.json(authenticationInfo);
    }
}

export default AuthenticateUserController;
