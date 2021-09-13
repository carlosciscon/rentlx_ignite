import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUserCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUserCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("shoul be able to create a new category", async () => {
        const category = {
            name: "Category test",
            description: "Category description test"
        };
        await createCategoryUserCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");

    });


    it("shoul not be able to create a new category with name exists", async () => {

        expect(async () => {
            const category = {
                name: "Category test",
                description: "Category description test"
            };
            await createCategoryUserCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUserCase.execute({
                name: category.name,
                description: category.description,
            });  
        
         }).rejects.toBeInstanceOf(AppError);

    });

})