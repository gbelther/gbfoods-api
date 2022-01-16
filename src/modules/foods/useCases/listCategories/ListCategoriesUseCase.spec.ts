import { CategoriesRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let listCategoriesUseCase: ListCategoriesUseCase;
let createCategoryUseCase: CreateCategoryUseCase;

describe("List Categories", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    );
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to list all categories created", async () => {
    const category1 = {
      name: "Categoria teste 1",
      description: "Categoria teste 1 - description",
    };

    const category2 = {
      name: "Categoria teste 2",
      description: "Categoria teste 2 - description",
    };

    await createCategoryUseCase.execute({
      name: category1.name,
      description: category1.description,
    });

    await createCategoryUseCase.execute({
      name: category2.name,
      description: category2.description,
    });

    const categories = await listCategoriesUseCase.execute();

    expect(categories).toHaveLength(2);
  });

  it("should be able to return a empty array if has not category created", async () => {
    const categories = await listCategoriesUseCase.execute();

    expect(categories).toHaveLength(0);
  });
});
