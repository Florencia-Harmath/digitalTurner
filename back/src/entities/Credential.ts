import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()
export class Credential {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username:  string

    @Column()
    password: string

    @OneToOne(() => User, usere => usere.credential)
    user: User;
}


