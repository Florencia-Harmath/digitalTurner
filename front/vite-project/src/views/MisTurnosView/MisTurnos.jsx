import Turnos from "../../components/Turnos/Turnos";
import styles from "./MisTurnos.module.css";
import { Link } from "react-router-dom";

const MisTurnos = () => {
  return (
    <div className={styles.div}>
      <div>
        <Link to="/schedule" className={styles.link}>NUEVO TURNO</Link>
      </div>
      <h1 className={styles.h1}>MIS TURNOS:</h1>
      <p className={styles.p}>Recuerda que si cancelas el turno, no se puede volver a programar!</p>
      <Turnos />
    </div>
  );
};

export default MisTurnos;
