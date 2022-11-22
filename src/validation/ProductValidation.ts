import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class ProductValidation {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  images: string;

  @IsString()
  price: string;

  @IsArray()
  @IsOptional()
  color: string[];

  @IsArray()
  @IsOptional()
  size: string[];

  @IsUUID()
  categoryId: string;

  constructor(productBody: ProductValidation) {
    this.title = productBody.title;
    this.description = productBody.description;
    this.color = productBody.color;
    this.images = productBody.images;
    this.price = productBody.price;
    this.size = productBody.size;
    this.categoryId = productBody.categoryId;
  }
}
