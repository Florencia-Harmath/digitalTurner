import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @Column()
    time: string

    @Column()
    userId: number

    @Column()
    status: string

    @Column()
    serviceName: string

    @ManyToOne(()=> User, user => user.appointments)
    user: User;
}

