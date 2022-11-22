import { Repository } from "typeorm";
import { AppDataSource } from "@config/data-source";
import { Category } from "@entity/Category";

export class CategoryRepository extends Repository<Category> {
  constructor() {
    const dataSource = AppDataSource;
    super(Category, dataSource.createEntityManager());
  }
}
