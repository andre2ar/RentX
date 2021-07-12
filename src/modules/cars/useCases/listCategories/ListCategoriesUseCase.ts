import ICategoriesRepository from "../../repositories/contracts/ICategoriesRepository";
import Category from "../../models/Category";

export default class ListCategoriesUseCase {
    constructor(
        private categoriesRepository: ICategoriesRepository
    ) {}

    execute(): Category[]
    {
        return this.categoriesRepository.list();
    }
}
