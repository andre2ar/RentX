import AppError from "@shared/errors/AppError";
import Category from "@modules/cars/infra/typeorm/entities/Category";
import CreateCategoryUseCase from "@modules/cars/useCases/createCategory/CreateCategoryUseCase";
import CategoriesRepositoryInMemory
    from "@modules/cars/repositories/implementations/CategoriesRepositoryInMemory";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it('should be able to create a new category', async () => {
        const category = await createCategoryUseCase.execute({
            name: "Category",
            description: "Description"
        });

        expect(category).toBeInstanceOf(Category);
        expect(category).toHaveProperty("id");
    });

    it('should not be able to create a new category with a not unique name', async () => {
        const notUniqueCategoryName = "Category";
        await createCategoryUseCase.execute({
            name: notUniqueCategoryName,
            description: "Description"
        });

        await expect(async () => {
            await createCategoryUseCase.execute({
                name: notUniqueCategoryName,
                description: "Description"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
