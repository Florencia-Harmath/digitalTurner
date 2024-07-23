import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize().then((res) => {
  console.log("Conexión a la base de datos inicializada con éxito");
  server.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`);
  });
});
