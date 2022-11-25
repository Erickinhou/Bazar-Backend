import { Like, Repository } from "typeorm";
import { AppDataSource } from "@config/data-source";
import { Product } from "@entity/Product";
import { Filter } from "@controller/ProductController";

export class ProductRepository extends Repository<Product> {
  constructor() {
    const dataSource = AppDataSource;
    super(Product, dataSource.createEntityManager());
  }

  async findWithFilter({ categoryId, searchTerm }: Filter) {
    const categoryFilter = categoryId ? { category: { id: categoryId } } : {};
    const searchFilter = searchTerm ? { title: Like(`%${searchTerm}%`) } : {};
    const where = { ...categoryFilter, ...searchFilter };

    return await this.find({
      where,
    });
  }
}
