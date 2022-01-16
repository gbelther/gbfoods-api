import { Router } from "express";

import { CreateCategoryController } from "../../../../modules/foods/useCases/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "../../../../modules/foods/useCases/deleteCategory/DeleteCategoryController";
import { ListCategoriesController } from "../../../../modules/foods/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.delete("/:id", deleteCategoryController.handle);

export { categoriesRoutes };
