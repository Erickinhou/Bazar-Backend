import { IsEnum } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from "typeorm";
import { User } from "./User";

export enum PaymentMethod {
  pix = 1,
  local = 2,
}
export enum OrderStatus {
  processing = 1,
  sending = 2,
  local_receive = 3,
  complete = 4,
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, { cascade: true, onDelete: "CASCADE" })
  user: User;

  @Column({ type: "enum", enum: ["pix", "local"], default: "pix" })
  @IsEnum(["pix", "local"])
  paymentMethod: PaymentMethod;

  @Column({
    type: "enum",
    enum: ["processing", "paid", "local_receive", "complete"],
    default: "processing",
  })
  @IsEnum(["processing", "paid", "local_receive", "complete"])
  status: OrderStatus;

  @UpdateDateColumn()
  updatedDate: Date;

  @CreateDateColumn()
  createdDate: Date;
}
