import styles from "./CardTurno.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const CardTurno = ({ turno, onCancelTurno }) => {
  if (!turno) {
    return null;
  }

  const formData = (dataString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dataString).toLocaleDateString("es-ES", options);
  };

  const getStatusClass = (status) => {
    return status === "active" ? styles.green : styles.red;
  };

  const handleCancel = () => {
    if (turno.status === "cancelled") {
      toast.info("El turno ya está cancelado.");
      return;
    }
    onCancelTurno(turno.id);
    toast.success("Turno cancelado con éxito.");
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerWords}>
        <h3 className={styles.nameService}>
          Servicio: {turno.serviceName && turno.serviceName.toUpperCase()}{" "}
        </h3>
        <p className={styles.date}>Fecha: {formData(turno.date)}</p>
        <p className={styles.time}>Hora: {turno.time}</p>
        <p className={`${styles.status} ${getStatusClass(turno.status)}`}>
          Estado: {turno.status === "active" ? "ACTIVO" : "CANCELADO"}
        </p>
        <button
          className={styles.cancelButton}
          onClick={handleCancel}
          disabled={turno.status === "cancelled"}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CardTurno;
