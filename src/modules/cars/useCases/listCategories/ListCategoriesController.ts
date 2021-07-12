import {Request, Response} from "express";
import CreateCategoryUseCase from "../createCategory/CreateCategoryUseCase";
import ListCategoriesUseCase from "./ListCategoriesUseCase";

export default class ListCategoriesController {
    constructor(
        private listCategoriesUseCase: ListCategoriesUseCase
    ) {}

    handle(request: Request, response: Response) {
        const categories = this.listCategoriesUseCase.execute();

        return response.status(200).json(categories);
    }
}
