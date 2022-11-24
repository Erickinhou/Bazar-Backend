import { NextFunction, Request, Response } from "express";
import { ProductRepository } from "@repository/ProductRepository";
import { CategoryRepository } from "@repository/CategoryRepository";
import { ProductValidation } from "validation/ProductValidation";
import { validateOrReject } from "class-validator";
import { ExpressError } from "utils/ExpressError";

export interface Filter {
  categoryId?: string;
  searchTerm?: string;
}

export class ProductController {
  private productRepository: ProductRepository;
  private categoryRepository: CategoryRepository;

  constructor() {
    this.productRepository = new ProductRepository();
    this.categoryRepository = new CategoryRepository();
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const query = request.query;
    const filter = query?.filter as Filter;

    if (filter) {
      const data = await this.productRepository.findWithFilter(filter);
      console.log("filter data ->", data);
      console.log("filter data ->", filter);

      return;
    }
    const products = await this.productRepository.find();
    console.log("products without filter -> ", products);
    console.log("without filter -> ", filter);

    return;
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.productRepository.findOne({ where: { id: request.params.id } });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const body = new ProductValidation(request.body);

    await validateOrReject(body);

    const category = await this.categoryRepository.findOneBy({
      id: body.categoryId,
    });

    delete body.categoryId;
    const product = { ...body, category };

    return await this.productRepository.save(product);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const productToRemove = await this.productRepository.findOneBy({
      id: request.params.id,
    });

    if (!productToRemove) throw new ExpressError("Product not found", 404);

    await this.productRepository.remove(productToRemove);
  }
}
