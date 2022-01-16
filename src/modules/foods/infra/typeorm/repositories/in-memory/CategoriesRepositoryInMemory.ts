import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../../../repositories/ICategoriesRepository";
import { Category } from "../../entities/Category";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[];

  constructor() {
    this.categories = [];
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);

    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter((category) => category.id !== id);
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name);
  }
}

export { CategoriesRepositoryInMemory };
