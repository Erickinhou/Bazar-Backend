import { FindManyOptions, Like, Repository } from "typeorm";
import { AppDataSource } from "@config/data-source";
import { Product } from "@entity/Product";

export interface Filter {
  categoryId?: string;
  search?: string;
}

export class ProductRepository extends Repository<Product> {
  constructor() {
    const dataSource = AppDataSource;
    super(Product, dataSource.createEntityManager());
  }

  async findWithFilter(
    { categoryId, search }: Filter,
    options?: FindManyOptions<Product>
  ) {
    const categoryFilter = categoryId ? { category: { id: categoryId } } : {};
    const searchFilter = search ? { title: Like(`%${search}%`) } : {};
    const where = { ...categoryFilter, ...searchFilter };

    return await this.find({
      where,
      ...options,
    });
  }
}
