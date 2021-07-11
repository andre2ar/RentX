import CategoriesRepository from "../repositories/categories/CategoriesRepository";
import Category from "../models/Category";
import ICategoriesRepository from "../repositories/categories/ICategoriesRepository";

interface ICreateCategory {
    name: string;
    description: string;
}

export default class CreateCategoryService {
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
