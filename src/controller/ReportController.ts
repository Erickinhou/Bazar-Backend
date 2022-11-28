import { NextFunction, Request, Response } from "express";
import { UserRepository } from "@repository/UserRepository";
import { JsonConverter } from "utils/JsonConverter";
import { OrderRepository } from "@repository/OrderRepository";

export class ReportController {
  private userRepository: UserRepository;
  private orderRepository: OrderRepository;
  private jsonConverter: JsonConverter;

  constructor() {
    this.userRepository = new UserRepository();
    this.orderRepository = new OrderRepository();
    this.jsonConverter = new JsonConverter();
  }

  async users(request: Request, response: Response, next: NextFunction) {
    const users = await this.userRepository.find();
    const csv = await this.jsonConverter.convertJsonToCsv(users);
    await response.attachment("users.csv").send(csv);
  }
  async orders(request: Request, response: Response, next: NextFunction) {
    const orders = await this.orderRepository.find({
      relations: { user: true, orderProduct: true },
    });
    const csv = await this.jsonConverter.convertJsonToCsv(orders);
    await response.attachment("orders.csv").send(csv);
  }
}
