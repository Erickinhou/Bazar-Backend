import { Repository } from "typeorm";
import { User } from "@entity/User";
import { AppDataSource } from "@config/data-source";

export class UserRepository extends Repository<User> {
  constructor() {
    const dataSource = AppDataSource;
    super(User, dataSource.createEntityManager());
  }

  async checkIfUserAlreadyExists(email: string) {
    return Boolean(await this.findOne({ where: { email } }));
  }
}
