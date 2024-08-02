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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  birthdate: Date;

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
