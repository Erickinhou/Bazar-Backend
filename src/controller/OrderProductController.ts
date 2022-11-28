import { NextFunction, Request, Response } from "express";
import {
  Filter,
  OrderProductRepository,
} from "@repository/OrderProductRepository";
import { validateOrReject } from "class-validator";
import { OrderProduct } from "@entity/OrderProduct";
import { JsonConverter } from "utils/JsonConverter";

export class OrderProductController {
  private orderProductRepository: OrderProductRepository;
  private jsonConverter: JsonConverter;

  constructor() {
    this.orderProductRepository = new OrderProductRepository();
    this.jsonConverter = new JsonConverter();
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const query = request.query;

    if (query?.filter) {
      const filter = this.jsonConverter.convertJsonToObject<Filter>(
        query?.filter
      );
      return await this.orderProductRepository.findWithFilter(filter, {
        relations: { order: true, product: true },
      });
    }

    return this.orderProductRepository.find({
      relations: { order: true, product: true },
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.orderProductRepository.findOne({
      where: { id: request.params.id },
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const orderProductsData: OrderProduct[] = request.body;
    const orderProducts = await this.orderProductRepository.create(
      orderProductsData
    );
    const validation = orderProducts.map((orderProduct) =>
      validateOrReject(orderProduct)
    );
    await Promise.all(validation);

    return await this.orderProductRepository.save(orderProducts);
  }
}
