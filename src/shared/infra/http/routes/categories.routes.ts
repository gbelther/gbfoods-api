import { Router } from "express";

import { CreateCategoryController } from "../../../../modules/foods/useCases/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "../../../../modules/foods/useCases/deleteCategory/DeleteCategoryController";
import { ListCategoriesController } from "../../../../modules/foods/useCases/listCategories/ListCategoriesController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  createCategoryController.handle
);
categoriesRoutes.get("/", ensureAuthenticated, listCategoriesController.handle);
categoriesRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteCategoryController.handle
);

export { categoriesRoutes };
