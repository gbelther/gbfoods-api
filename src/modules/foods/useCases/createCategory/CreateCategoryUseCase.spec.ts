import { CategoriesRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be create a new category", async () => {
    const category = {
      name: "Categoria teste 1",
      description: "Categoria teste 1 - descrição",
    };

    const categoryCreated = await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    console.log(categoryCreated);

    expect(categoryCreated).toHaveProperty("id");
  });
});
