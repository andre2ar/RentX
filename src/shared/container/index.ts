import {container} from "tsyringe";
import ISpecificationsRepository from "@modules/cars/repositories/contracts/ISpecificationsRepository";
import ICategoriesRepository from "@modules/cars/repositories/contracts/ICategoriesRepository";
import UsersRepository from "@modules/accounts/repositories/implementations/UsersRepository";
import SpecificationRepository from "@modules/cars/repositories/implementations/SpecificationRepository";
import CategoriesRepository from "@modules/cars/repositories/implementations/CategoriesRepository";
import IUsersRepository from "@modules/accounts/repositories/contracts/IUsersRepository";

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);
