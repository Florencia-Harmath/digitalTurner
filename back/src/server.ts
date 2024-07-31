import express, { Request, Response, NextFunction } from "express";
import router from "./routes";
import cors from "cors";
import { CLIENT_URL } from "./config/envs";

const server = express();

server.use(cors({
  origin: CLIENT_URL || 'http://localhost:5173', 
}));

server.use(express.json());

server.use(router);

server.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error interno del servidor" });
  });
  

export default server;
