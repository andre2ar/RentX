import CreateCategoryUseCase from "./CreateCategoryUseCase";
import CategoriesRepository from "../../repositories/categories/CategoriesRepository";
import CreateCategoryController from "./CreateCategoryController";

const categoriesRepository = new CategoriesRepository();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export {createCategoryController};
