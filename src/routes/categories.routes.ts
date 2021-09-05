import {Router} from "express";
import multer from "multer";

import CreateCategoryController from "../modules/cars/useCases/createCategory/CreateCategoryController";
import ImportCategoryController from "../modules/cars/useCases/importCategory/ImportCategoryController";
import ListCategoriesController from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({
    dest: "./tmp",
});

categoriesRouter.get('/', listCategoriesController.handle);
categoriesRouter.post('/', createCategoryController.handle);
categoriesRouter.post('/import', upload.single('file'), importCategoryController.handle);

export default categoriesRouter;
