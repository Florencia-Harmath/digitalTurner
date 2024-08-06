import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../helpers/api"; 
import { addAppointment, cancelAppointments } from "../../redux/userSlice";  // Importamos `addAppointment`
import CardTurno from "../CardTurno/CardTurno";
import styles from "./Turnos.module.css";

const fetchUserAppointments = async (idUser, dispatch, setUserAppointments) => {
  try {
    const response = await api.get(`/users/${idUser}`);
    console.log("Respuesta de la API:", response.data);

    const { appointments } = response.data;
    
    if (appointments && Array.isArray(appointments)) {
      setUserAppointments(appointments);
      dispatch(addAppointment(appointments));  // Guardamos los turnos en el estado global
    } else {
      console.warn("No se encontraron turnos o el formato no es el esperado.");
      setUserAppointments([]);
    }
  } catch (error) {
    console.error("Error al obtener los turnos del usuario:", error);
    setUserAppointments([]);  // En caso de error, establecemos un array vacío para evitar problemas de renderizado
  }
};

const Turnos = () => {
  const dispatch = useDispatch();
  const [userAppointments, setUserAppointments] = useState([]);
  const idUser = useSelector((state) => state.user.userId);

  useEffect(() => {
    if (idUser) {
      fetchUserAppointments(idUser, dispatch, setUserAppointments);
    }
  }, [idUser, dispatch]);  // Agregamos `dispatch` como dependencia

  const handleCancelTurno = (id) => {
    api
      .put(`/appointments/cancel/${id}`)
      .then(() => {
        console.log("Turno cancelado:", id);
        dispatch(cancelAppointments(id));  // Actualizamos el estado global
        fetchUserAppointments(idUser, dispatch, setUserAppointments); // Volvemos a obtener los turnos actualizados
      })
      .catch((err) => console.log("Error al cancelar turno:", err));
  };

  return (
    <div className={styles.container}>
      {userAppointments && userAppointments.length > 0 ? (
        userAppointments.map((turno, index) => (
          <CardTurno
            key={index}
            turno={turno}
            onCancelTurno={handleCancelTurno}
          />
        ))
      ) : (
        <p className={styles.p}>No hay turnos programados.</p>
      )}
    </div>
  );  
};

export default Turnos;
