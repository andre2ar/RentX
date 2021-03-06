import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import AuthenticateUserUseCase from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import UsersRepositoryInMemory from "@modules/accounts/repositories/implementations/UsersRepositoryInMemory";
import CreateUserUseCase from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import AppError from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();

        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            email: "user@test.com",
            name: "User",
            password: "123456",
            driver_license: "123456"
        };

        await createUserUseCase.execute(user);

        const response = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(response).toHaveProperty("token");
    });

    it('should not be able to authenticate a nonexistent user', async () => {
        await expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "123456"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with incorrect password', async () => {
        await expect(async () => {
            const user: ICreateUserDTO = {
                email: "user@test.com",
                name: "User",
                password: "123456",
                driver_license: "123456"
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "wrong"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
