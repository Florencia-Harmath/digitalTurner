import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appointment } from "./Appointment";
import { RoleEnum } from "../enum/roleEnum";
import { StatusUserEnum } from "../enum/statusUserEnum";
const { v4: uuidv4 } = require("uuid");

@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn()
  id: string = new uuidv4();

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  birthdate: Date;

  @Column()
  nDni: number;

  @Column()
  password: string;

  @Column({  nullable: true })
  profilePicture: string;

  @Column({ default: RoleEnum.USER })
  role: RoleEnum;

  @Column({ default: StatusUserEnum.ACTIVE })
  status: StatusUserEnum

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  @JoinColumn()
  appointments: Appointment[];
}
