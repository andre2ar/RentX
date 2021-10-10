import {container} from "tsyringe";
import ISpecificationsRepository from "@modules/cars/repositories/contracts/ISpecificationsRepository";
import ICategoriesRepository from "@modules/cars/repositories/contracts/ICategoriesRepository";
import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import SpecificationRepository from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import CategoriesRepository from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
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
