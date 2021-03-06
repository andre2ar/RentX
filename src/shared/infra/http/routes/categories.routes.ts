import {Router} from "express";
import multer from "multer";
import ImportCategoryController from "@modules/cars/useCases/importCategory/ImportCategoryController";
import ListCategoriesController from "@modules/cars/useCases/listCategories/ListCategoriesController";
import CreateCategoryController from "@modules/cars/useCases/createCategory/CreateCategoryController";
import {ensureAuthenticated} from "@middlewares/middlewares/ensureAuthenticated";

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({
    dest: "./uploads/categories",
});

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.get('/', listCategoriesController.handle);
categoriesRouter.post('/', createCategoryController.handle);
categoriesRouter.post('/import', upload.single('file'), importCategoryController.handle);

export default categoriesRouter;
