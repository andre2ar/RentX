import Category from "../../entities/Category";
import ICategoriesRepository from "../../repositories/contracts/ICategoriesRepository";

interface ICreateCategory {
    name: string;
    description: string;
}

export default class CreateCategoryUseCase {
    constructor(
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, description }: ICreateCategory): Promise<Category>
    {
        const categoryExists = await this.categoriesRepository.findByName(name);
        if(categoryExists) {
            throw new Error("Category already exists");
        }

        return await this.categoriesRepository.create({
            name,
            description
        });
    }
}
