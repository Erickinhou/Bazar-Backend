import { IsEmail, Length, MinLength } from "class-validator";

export class UserValidation {
  @MinLength(6)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;

  @MinLength(10)
  phone: string;

  @Length(11)
  cpf: string;

  constructor(userBody: UserValidation) {
    this.name = userBody.name;
    this.email = userBody.email;
    this.password = userBody.password;
    this.phone = userBody.phone;
    this.cpf = userBody.cpf;
  }
}
