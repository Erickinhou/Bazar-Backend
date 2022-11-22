import { NextFunction, Request, Response } from "express";
import { CategoryRepository } from "@repository/CategoryRepository";
import { CategoryValidation } from "validation/CategoryValidation";
import { ExpressError } from "utils/ExpressError";

export class CategoryController {
  private categoryRepository;

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
    const body = new CategoryValidation(request.body);
    return await this.categoryRepository.save(body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const categoryToRemove = await this.categoryRepository.findOneBy({
      id: request.params.id,
    });

    if (!categoryToRemove) throw new ExpressError("Category not found", 404);

    await this.categoryRepository.remove(categoryToRemove);
  }
}
