import { NextFunction, Request, Response } from "express";
import { UserRepository } from "@repository/UserRepository";
import { ExpressError } from "utils/ExpressError";
import { validateOrReject } from "class-validator";

interface SignInBody {
  email: string;
  password: string;
}

export class AuthController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signIn(request: Request, response: Response, next: NextFunction) {
    const { email, password }: SignInBody = request.body;
    if (!email && !password)
      throw new ExpressError("Os campos precisam estar preenchidos", 400);
    const userData = await this.userRepository.findOne({
      where: { email, password },
    });
    if (!userData) throw new ExpressError("Email ou senha invalidos", 400);

    return userData;
  }

  async signUp(request: Request, response: Response, next: NextFunction) {
    const { body } = request;

    if (await this.userRepository.checkIfUserAlreadyExists(body.email)) {
      throw new ExpressError("User Already Exists", 400);
    }

    const userData = this.userRepository.create(request.body);
    await validateOrReject(userData);

    return this.userRepository.save(userData);
  }
}
