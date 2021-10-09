import Category from "@modules/cars/entities/Category";
import ICategoriesRepository, {ICreateCategoryDTO} from "@modules/cars/repositories/contracts/ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async create({name, description}: ICreateCategoryDTO): Promise<Category> {
        const category = new Category();
        Object.assign(category, {
            name,
            description
        });

        this.categories.push(category);

        return category;
    }

    async findByName(name: string): Promise<Category> {
        return this.categories.find((category) => category.name === name);
    }

    async list(): Promise<Category[]> {
        return this.categories;
    }
}

export default CategoriesRepositoryInMemory;
