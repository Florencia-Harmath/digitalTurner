import "reflect-metadata";
import server from "./server";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/data-source";

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Conexión a la base de datos inicializada con éxito");

    server.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    process.exit(1); 
  }
};

startServer();
