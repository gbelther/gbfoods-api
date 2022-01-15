interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
