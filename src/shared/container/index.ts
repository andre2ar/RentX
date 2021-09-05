import {container} from "tsyringe";

import ICategoriesRepository from "../../modules/cars/repositories/contracts/ICategoriesRepository";
import CategoriesRepository from "../../modules/cars/repositories/implementations/CategoriesRepository";

import ISpecificationsRepository from "../../modules/cars/repositories/contracts/ISpecificationsRepository";
import SpecificationRepository from "../../modules/cars/repositories/implementations/SpecificationRepository";

import IUsersRepository from "../../modules/accounts/repositories/contracts/IUsersRepository";
import UsersRepository from "../../modules/accounts/repositories/implementations/UsersRepository";

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
