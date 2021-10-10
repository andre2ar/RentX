import {inject, injectable} from "tsyringe";
import Category from "@modules/cars/infra/typeorm/entities/Category";
import ICategoriesRepository from "@modules/cars/repositories/contracts/ICategoriesRepository";

@injectable()
export default class ListCategoriesUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute(): Promise<Category[]>
    {
        return await this.categoriesRepository.list();
    }
}
