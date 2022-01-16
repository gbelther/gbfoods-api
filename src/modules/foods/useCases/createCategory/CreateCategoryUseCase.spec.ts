import { AppError } from "../../../../shared/errors/AppError";
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

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with invalids params", async () => {
    const category = {
      name: null,
      description: "Categoria teste 1 - descrição",
    };

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(
      new AppError("Os parâmetros name e description são obrigatórios!")
    );
  });

  it("should not be able to create another category with a existing name", async () => {
    const category = {
      name: "Categoria teste 1",
      description: "Categoria teste 1 - descrição",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(
      new AppError(`A categoria com o nome ${category.name} já existe!`)
    );
  });
});
