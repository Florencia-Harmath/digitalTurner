import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Appointment } from "../entities/Appointment"
const { DBHOST, DBPORT, DBUSERNAME, DBPASSWORD, DBNAME } = process.env



export const AppDataSource = new DataSource({
    type: "postgres",
    host: DBHOST,
    port: Number(DBPORT),
    username: DBUSERNAME,
    password: DBPASSWORD,
    database: DBNAME,
    synchronize: true,
    // dropSchema: true,
    logging: false,
    entities: [User, Appointment],
    subscribers: [],
    migrations: [],
})