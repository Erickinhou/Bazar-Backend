import { NextFunction, Request, Response } from "express";
import { UserRepository } from "@repository/UserRepository";
import { ExpressError } from "utils/ExpressError";
import { User } from "@entity/User";

interface SignInBody {
  email: string;
  password: string;
}

export class AuthController {
  private userRepository = new UserRepository();

  async signIn(request: Request, response: Response, next: NextFunction) {
    const { email, password }: SignInBody = request.body;
    if (email && password) throw new ExpressError("unauthorized", 401);

    return this.userRepository.find({ where: { email, password } });
  }

  async signUp(request: Request, response: Response, next: NextFunction) {
    const userData: User = request.body;
    if (this.userRepository.checkIfUserAlreadyExists(userData.email))
      throw new ExpressError("User Already Exists", 400);

    return this.userRepository.save(userData);
  }
}
