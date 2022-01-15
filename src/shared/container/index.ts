import { container } from "tsyringe";
import { CategoriesRepository } from "../../modules/foods/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "../../modules/foods/repositories/ICategoriesRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);
