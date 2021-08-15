import Category from "../../entities/Category";
import ICategoriesRepository from "../../repositories/contracts/ICategoriesRepository";
import {inject, injectable} from "tsyringe";

interface ICreateCategory {
    name: string;
    description: string;
}

@injectable()
export default class CreateCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
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
