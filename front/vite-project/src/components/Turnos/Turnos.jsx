import { useSelector, useDispatch } from "react-redux";
import api from "../../helpers/api"; 
import { addAppointment, cancelAppointments } from "../../redux/userSlice";
import CardTurno from "../CardTurno/CardTurno";
import styles from "./Turnos.module.css";
import { useEffect } from "react";

const Turnos = () => {
  const dispatch = useDispatch();
  const idUser = useSelector((state) => state.user.userId);
  const userAppointments = useSelector((state) => state.user.userAppointments);

  const fetchUserAppointments = async (idUser, dispatch) => {
    try {
      const response = await api.get(`/users/${idUser}`);
      console.log("Respuesta de la API:", response.data);
  
      const { appointments } = response.data;
      
      if (appointments && Array.isArray(appointments)) {
        dispatch(addAppointment(appointments));  // Guardamos los turnos en el estado global
      } else {
        console.warn("No se encontraron turnos o el formato no es el esperado.");
        dispatch(addAppointment([]));  // Enviamos un array vacío si no hay turnos
      }
    } catch (error) {
      console.error("Error al obtener los turnos del usuario:", error);
      dispatch(addAppointment([]));  // Enviamos un array vacío en caso de error
    }
  };

  useEffect(() => {
    if (idUser) {
      fetchUserAppointments(idUser, dispatch);
    }
  }, [idUser, dispatch]);

  const handleCancelTurno = async (id) => {
    try {
      await api.put(`/appointments/cancel/${id}`);
      console.log("Turno cancelado:", id);
      dispatch(cancelAppointments(id));
      fetchUserAppointments(idUser, dispatch); // Actualizamos los turnos en Redux
    } catch (err) {
      console.log("Error al cancelar turno:", err);
    }
  };

  return (
    <div className={styles.container}>
      {userAppointments && userAppointments.length > 0 ? (
        userAppointments.map((turno, index) => (
          <CardTurno
            key={index}
            turno={turno}
            onCancelTurno={() => handleCancelTurno(turno.id)}  // Asegúrate de pasar el ID correctamente
          />
        ))
      ) : (
        <p className={styles.p}>No hay turnos programados.</p>
      )}
    </div>
  );
};

export default Turnos;
