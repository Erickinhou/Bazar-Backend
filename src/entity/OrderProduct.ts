import { IsNumber } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

export type PaymentMethod = "pix" | "local";
export type OrderStatus = "processing" | "paid" | "local_receive" | "complete";

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Order, { cascade: true, onDelete: "CASCADE" })
  order: Order;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  @IsNumber()
  amount: number;

  @UpdateDateColumn()
  updatedDate: Date;

  @CreateDateColumn()
  createdDate: Date;
}
