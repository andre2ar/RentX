import {getRepository, Repository} from "typeorm";
import Category from "@modules/cars/entities/Category";
import ICategoriesRepository, {ICreateCategoryDTO} from "@modules/cars/repositories/contracts/ICategoriesRepository";

export default class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({name, description}: ICreateCategoryDTO): Promise<Category> {
        const category = this.repository.create({
            name,
            description
        });

        await this.repository.save(category);

        return category;
    }

    async list(): Promise<Category[]>{
        return await this.repository.find();
    }

    async findByName(name: string): Promise<Category> {
        return this.repository.findOne({
            name: name
        });
    }
}
