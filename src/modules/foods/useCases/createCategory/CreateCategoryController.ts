import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const categoryCreated = await createCategoryUseCase.execute({
      name,
      description,
    });

    return response.status(201).send(categoryCreated);
  }
}

export { CreateCategoryController };
