import { CategoriesRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "../listCategories/ListCategoriesUseCase";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
let deleteCategoriesUseCase: DeleteCategoryUseCase;
let listCategoriesUseCase: ListCategoriesUseCase;

describe("Delete Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
    deleteCategoriesUseCase = new DeleteCategoryUseCase(
      categoriesRepositoryInMemory
    );
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to delete a category existing", async () => {
    const category = {
      name: "Categoria teste",
      description: "Categoria teste - description",
    };

    const categoryCreated = await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await deleteCategoriesUseCase.execute(categoryCreated.id);

    const categories = await listCategoriesUseCase.execute();

    expect(
      categories.find((cat) => cat.id === categoryCreated.id)
    ).toBeUndefined();
  });
});
