import { NextFunction, Request, Response } from "express";
import { UserRepository } from "@repository/UserRepository";
import { ExpressError } from "utils/ExpressError";

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

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userToRemove = await this.userRepository.findOneBy({
      id: request.params.id,
    });
    if (!userToRemove) throw new ExpressError("User not found", 404);

    await this.userRepository.remove(userToRemove);
  }
}
