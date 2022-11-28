import { FindManyOptions, Repository } from "typeorm";
import { Address } from "@entity/Address";
import { AppDataSource } from "@config/data-source";

export interface Filter {
  userId?: string;
}

export class AddressRepository extends Repository<Address> {
  constructor() {
    const dataSource = AppDataSource;
    super(Address, dataSource.createEntityManager());
  }

  async findWithFilter({ userId }: Filter, options?: FindManyOptions<Address>) {
    const userFilter = userId ? { user: { id: userId } } : {};

    const where = { ...userFilter };

    return await this.find({
      where,
      ...options,
    });
  }
}
