import Category from "../../models/Category";

export interface ICreateCategoryDTO {
    name: string;
    description: string;
}

export default interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({name, description}: ICreateCategoryDTO): Category;
}
