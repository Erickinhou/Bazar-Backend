import { IsString } from "class-validator";

export class CategoryValidation {
  @IsString()
  title: string;

  @IsString()
  description: string;

  constructor(categoryBody: CategoryValidation) {
    this.title = categoryBody.title;
    this.description = categoryBody.description;
  }
}
