import { Repository } from "typeorm";
import { AppDataSource } from "@config/data-source";
import { Product } from "@entity/Product";

export class ProductRepository extends Repository<Product> {
  constructor() {
    const dataSource = AppDataSource;
    super(Product, dataSource.createEntityManager());
  }

  async findByCategoryId(id: string) {
    return this.find({
      where: { category: { id } },
    });
  }
}
