import {Router, Request, Response, response} from "express";
import CategoriesRepository from "../modules/cars/repositories/categories/CategoriesRepository";
import CreateCategoryService from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/', (request: Request, response: Response) => {
    const categories = categoriesRepository.list();

    return response.status(200).json(categories);
});

categoriesRoutes.post('/', (request: Request, response: Response) => {
    const {name, description} = request.body;

    const createCategoryService = new CreateCategoryService(categoriesRepository);

    const category = createCategoryService.execute({
        name,
        description
    });

    return response.status(201).json(category);
});

export default categoriesRoutes;
