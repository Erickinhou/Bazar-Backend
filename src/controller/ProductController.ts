import { NextFunction, Request, Response } from "express";
import { Filter, ProductRepository } from "@repository/ProductRepository";
import { CategoryRepository } from "@repository/CategoryRepository";
import { validateOrReject } from "class-validator";
import { ExpressError } from "utils/ExpressError";
import { JsonConverter } from "utils/JsonConverter";

export class ProductController {
  private productRepository: ProductRepository;
  private categoryRepository: CategoryRepository;
  private jsonConverter: JsonConverter;

  constructor() {
    this.productRepository = new ProductRepository();
    this.categoryRepository = new CategoryRepository();
    this.jsonConverter = new JsonConverter();
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const query = request.query;

    if (query?.filter) {
      const filter = this.jsonConverter.convertJsonToObject<Filter>(
        query?.filter
      );
      return await this.productRepository.findWithFilter(filter);
    }

    return await this.productRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.productRepository.findOne({ where: { id: request.params.id } });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { categoryId, ...productData } = request.body;

    const product = this.productRepository.create(productData);

    await validateOrReject(product);

    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    return await this.productRepository.save({ ...product, category });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const productToRemove = await this.productRepository.findOneBy({
      id: request.params.id,
    });

    if (!productToRemove) throw new ExpressError("Produto não encontrado", 404);

    await this.productRepository.remove(productToRemove);
  }
}
