import "dotenv/config";

//SERVER
export const PORT = process.env.PORT;
export const PROTO = process.env.PROTO
export const HOST = process.env.HOST

//DATABASE
export const DBPORT = process.env.PORT
export const DBHOST = process.env.DBHOST
export const DBUSERNAME = process.env.DBUSERNAME
export const DBPASSWORD = process.env.DBPASSWORD
export const DBNAME = process.env.DBNAM

//JWT
export const JWTSECRET = process.env.JWTSECR
export const CLIENT_URL = process.env.CLIENT_URL

//NODMAILER
export const EMAILNODEMAILER = process.env.EMAILNODEMAILER
export const PASSWORDNODEMAILER = process.env.PASSWORDNODEMAILER
export const EMAIL_HOST = process.env.EMAIL_HOST