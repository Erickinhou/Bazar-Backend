import { IsEmail, IsString, Length, MinLength } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Unique,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @MinLength(3)
  @Column()
  name: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @MinLength(5)
  @IsString()
  @Column()
  password: string;

  @MinLength(6)
  @Column()
  phone: string;

  @Length(11)
  @Column()
  cpf: string;

  @UpdateDateColumn()
  updatedDate: Date;

  @CreateDateColumn()
  createdDate: Date;
}
