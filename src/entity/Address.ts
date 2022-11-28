import { IsNumber, IsOptional, IsString } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @Column()
  street: string;

  @IsNumber()
  @Column()
  number: number;

  @IsString()
  @Column()
  district: string;

  @IsString()
  @Column()
  cep: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  complement: string;

  @UpdateDateColumn()
  updatedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => User, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: false,
  })
  user: User;
}
