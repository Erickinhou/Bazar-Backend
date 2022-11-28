import { NextFunction, Request, Response } from "express";
import { Filter, OrderRepository } from "@repository/OrderRepository";
import { ExpressError } from "utils/ExpressError";
import { UserRepository } from "@repository/UserRepository";
import { validateOrReject } from "class-validator";
import { Order } from "@entity/Order";
import { JsonConverter } from "utils/JsonConverter";

export class OrderController {
  private orderRepository: OrderRepository;
  private userRepository: UserRepository;
  private jsonConverter: JsonConverter;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.userRepository = new UserRepository();
    this.jsonConverter = new JsonConverter();
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const query = request.query;

    if (query?.filter) {
      const filter = this.jsonConverter.convertJsonToObject<Filter>(
        query?.filter
      );
      return await this.orderRepository.findWithFilter(filter);
    }

    return this.orderRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.orderRepository.findOne({
      where: { id: request.params.id },
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { userId, ...orderData } = request.body;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new ExpressError("Unauthorized", 401);

    const order = this.orderRepository.create(orderData);
    await validateOrReject(order);

    return await this.orderRepository.save({ ...order, user });
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const orderData: Order = request.body;
    delete orderData.id;
    delete orderData.user;

    const order = this.orderRepository.create(orderData);

    const id = request.params.id;

    return await this.orderRepository.update(id, order);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const orderToRemove = await this.orderRepository.findOneBy({
      id: request.params.id,
    });

    if (!orderToRemove) throw new ExpressError("Pedido não encontrada", 404);

    await this.orderRepository.remove(orderToRemove);
    await response.status(204).send();
  }
}
