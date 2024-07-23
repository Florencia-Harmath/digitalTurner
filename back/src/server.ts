import express from "express";
import router from "./routes";
import cors from "cors";

const server = express();

server.use(cors({
    origin: 'http://localhost:5173'
}));
server.use(express.json());
server.use(router);


export default server;
