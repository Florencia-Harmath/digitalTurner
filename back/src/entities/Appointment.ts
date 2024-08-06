import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column()
    userId: string;

    @Column()
    status: string;

    @Column()
    serviceName: string;

    @ManyToOne(() => User, user => user.appointments)
    user: User;
}
