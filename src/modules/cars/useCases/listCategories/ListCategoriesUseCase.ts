import ICategoriesRepository from "../../repositories/contracts/ICategoriesRepository";
import Category from "../../entities/Category";

export default class ListCategoriesUseCase {
    constructor(
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute(): Promise<Category[]>
    {
        return await this.categoriesRepository.list();
    }
}
