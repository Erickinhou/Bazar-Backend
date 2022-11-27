import { IsArray, IsOptional, IsString } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column("text")
  description: string;

  @IsArray()
  @IsOptional()
  @Column("simple-array")
  images: string;

  @IsString()
  @Column()
  price: string;

  @IsArray()
  @IsOptional()
  @Column({ nullable: true, type: "simple-array" })
  color: string[];

  @IsArray()
  @IsOptional()
  @Column({ nullable: true, type: "simple-array" })
  size: string[];

  @UpdateDateColumn()
  updatedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;
}
