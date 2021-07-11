import Category from "../../models/Category";
import ICategoriesRepository, {ICreateCategoryDTO} from "./ICategoriesRepository";

export default class CategoriesRepository implements ICategoriesRepository{
    private readonly categories: Category[];

    constructor() {
        this.categories = [];
    }

    create({name, description}: ICreateCategoryDTO): Category {
        const category = new Category();

        Object.assign(category, {
            name,
            description
        });

        this.categories.push(category);

        return category;
    }

    list(): Category[]{
        return this.categories;
    }

    findByName(name: string): Category {
        return this.categories.find(category => category.name === name);
    }
}
