import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "@config/data-source";
import { OrderProduct } from "@entity/OrderProduct";

export interface Filter {
  orderId?: string;
}

export class OrderProductRepository extends Repository<OrderProduct> {
  constructor() {
    const dataSource = AppDataSource;
    super(OrderProduct, dataSource.createEntityManager());
  }

  async findWithFilter(
    { orderId }: Filter,
    options?: FindManyOptions<OrderProduct>
  ) {
    const orderFilter = orderId ? { order: { id: orderId } } : {};

    const where = { ...orderFilter };

    return await this.find({
      where,
      ...options,
    });
  }
}
