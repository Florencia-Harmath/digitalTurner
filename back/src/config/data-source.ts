import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Appointment } from "../entities/Appointment"
import { Credential } from "../entities/Credential"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Milo2021",
    database: "proyectom3",
    synchronize: true,
    // dropSchema: true,
    logging: false,
    entities: [User, Appointment, Credential],
    subscribers: [],
    migrations: [],
})