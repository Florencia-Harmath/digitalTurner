import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
const { v4: uuidv4 } = require('uuid');


@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: string = new uuidv4();

    @Column()
    date: Date

    @Column()
    time: string

    @Column()
    userId: string

    @Column()
    status: string

    @Column()
    serviceName: string

    @ManyToOne(()=> User, user => user.appointments)
    user: User;
}

