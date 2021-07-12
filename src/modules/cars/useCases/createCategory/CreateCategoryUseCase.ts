import Category from "../../models/Category";
import ICategoriesRepository from "../../repositories/contracts/ICategoriesRepository";

interface ICreateCategory {
    name: string;
    description: string;
}

export default class CreateCategoryUseCase {
    constructor(
        private categoriesRepository: ICategoriesRepository
    ) {}

    execute({ name, description }: ICreateCategory): Category
    {
        const categoryExists = this.categoriesRepository.findByName(name);
        if(categoryExists) {
            throw new Error("Category already exists");
        }

        return this.categoriesRepository.create({
            name,
            description
        });
    }
}
