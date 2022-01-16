import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    if (!name || !description) {
      throw new AppError("Os parâmetros name e description são obrigatórios!");
    }

    const categoryNameAlreadyExists =
      this.categoriesRepository.findByName(name);

    if (categoryNameAlreadyExists) {
      throw new AppError(`A categoria com o nome ${name} já existe!`);
    }

    return this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
