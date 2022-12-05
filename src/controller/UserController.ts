import { NextFunction, Request, Response } from "express";
import { UserRepository } from "@repository/UserRepository";
import { ExpressError } from "utils/ExpressError";
import { validateOrReject } from "class-validator";
import { User } from "@entity/User";

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne({ where: { id: request.params.id } });
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const userData: User = request.body;

    const user = this.userRepository.create(userData);
    await validateOrReject(user, { skipMissingProperties: true });
    return await this.userRepository.save({
      id,
      ...user,
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userToRemove = await this.userRepository.findOneBy({
      id: request.params.id,
    });
    if (!userToRemove) throw new ExpressError("Usuário não encontrado", 404);

    await this.userRepository.remove(userToRemove);
    await response.status(204).send();
  }
}
