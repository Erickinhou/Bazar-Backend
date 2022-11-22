import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column("simple-array")
  images: string;

  @Column()
  price: string;

  @Column({ nullable: true, type: "simple-array" })
  color: string[];

  @Column({ nullable: true, type: "simple-array" })
  size: string[];

  @UpdateDateColumn()
  updatedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => Category, (category) => category.product)
  @JoinTable()
  category: Category;
}
