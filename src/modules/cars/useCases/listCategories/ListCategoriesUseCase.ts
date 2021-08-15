import ICategoriesRepository from "../../repositories/contracts/ICategoriesRepository";
import Category from "../../entities/Category";
import {inject, injectable} from "tsyringe";

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
