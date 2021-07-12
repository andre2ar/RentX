import CategoriesRepository from "../../repositories/categories/CategoriesRepository";
import ListCategoriesUseCase from "./ListCategoriesUseCase";
import ListCategoriesController from "./ListCategoriesController";

const categoriesRepository = new CategoriesRepository();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export {listCategoriesController};
