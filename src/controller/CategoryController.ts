import { NextFunction, Request, Response } from "express";
import { CategoryRepository } from "@repository/CategoryRepository";
import { ExpressError } from "utils/ExpressError";
import { validateOrReject } from "class-validator";

export class CategoryController {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async all(request: Request, response: Response, next: NextFunction) {
    return this.categoryRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.categoryRepository.findOne({
      where: { id: request.params.id },
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const body = request.body;
    const category = this.categoryRepository.create(body);
    await validateOrReject(category);
    return await this.categoryRepository.save(category);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const categoryToRemove = await this.categoryRepository.findOneBy({
      id: request.params.id,
    });

    if (!categoryToRemove)
      throw new ExpressError("Catergoria não encontrada", 404);

    await this.categoryRepository.remove(categoryToRemove);
    await response.status(204).send();
  }
}
