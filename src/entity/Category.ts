import { IsString } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column()
  description: string;

  @UpdateDateColumn()
  updatedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @OneToMany(() => Product, (product) => product.category, {
    cascade: true,
    onDelete: "CASCADE",
  })
  product: Product[];
}
