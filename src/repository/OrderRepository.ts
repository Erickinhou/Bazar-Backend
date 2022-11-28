import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "@config/data-source";
import { Order } from "@entity/Order";

export interface Filter {
  userId: string;
}

export class OrderRepository extends Repository<Order> {
  constructor() {
    const dataSource = AppDataSource;
    super(Order, dataSource.createEntityManager());
  }

  async findWithFilter({ userId }: Filter, options?: FindManyOptions<Order>) {
    const orderFilter = userId ? { user: { id: userId } } : {};

    const where = { ...orderFilter };

    return await this.find({
      where,
      ...options,
    });
  }
}
