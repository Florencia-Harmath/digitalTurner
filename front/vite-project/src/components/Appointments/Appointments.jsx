import styles from "./Appointments.module.css";
import { useState } from "react";
import axios from "axios";
import { validateAppointment } from "../../helpers/validate.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAppointment } from "../../redux/userSlice.js";
import { useSelector } from "react-redux";

const Appointments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  const [appointment, setAppointment] = useState({
    date: "",
    time: "",
    serviceName: "",
    userId: userId,
  });

  const [errors, setErrors] = useState({});

  const servicios = [
    "Corte de pelo",
    "Coloracion",
    "Depilacion laser",
    "pestañas PxP",
    "Corte de barba",
    "Limpieza facial",
    "Microblading cejas",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointment({ ...appointment, [name]: value });
    setErrors(validateAppointment({ ...appointment, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validateErrors = validateAppointment(appointment);
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
    } else {
      axios
        .post("http://localhost:3000/appointments/schedule", appointment)
        .then((response) => {
          const res = response.data;
          console.log("info del turno seleccionado", res);
          alert("Turno solicitado con éxito");
          dispatch(addAppointment(res));
          navigate("/turnos");
        })
        .catch((error) => {
          console.error("Error al solicitar turno:", error.message);
          alert(
            "Error al solicitar turno. Por favor, inténtalo de nuevo más tarde."
          );
        });
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 10; hour < 17; hour++) {
      options.push(
        <option key={hour} value={`${hour}:00`}>
          {`${hour}:00`}
        </option>,
        <option key={`${hour}:30`} value={`${hour}:30`}>
          {`${hour}:30`}
        </option>
      );
    }
    return options;
  };

  const today = new Date();
  today.setDate(today.getDate() + 1);

  return (
    <>
      <h2 className={styles.h2}>SOLICITAR TURNO:</h2>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.divContenedor}>
            <label>FECHA:</label>
            <input
              type="date"
              onChange={handleChange}
              name="date"
              min={today.toISOString().split("T")[0]}
              value={appointment.date}
            />
            {errors.date && <p className={styles.error}>{errors.date}</p>}
          </div>

          <div className={styles.divContenedor}>
            <label>HORA:</label>
            <select
              onChange={handleChange}
              name="time"
              value={appointment.time}
              className={styles.selectTime}
            >
              <option value="">-- Seleccione horario --</option>
              {generateTimeOptions()}
            </select>
            {errors.time && <p className={styles.error}>{errors.time}</p>}
          </div>

          <div className={styles.divContenedor}>
            <label>SERVICIO:</label>
            <select
              onChange={handleChange}
              name="serviceName"
              value={appointment.serviceName}
              className={styles.selectService}
            >
              <option value="">-- Seleccione servicio --</option>
              {servicios.map((servicio) => (
                <option key={servicio} value={servicio}>
                  {servicio}
                </option>
              ))}
            </select>
            {errors.serviceName && (
              <p className={styles.error}>{errors.serviceName}</p>
            )}
          </div>

          <button type="submit" className={styles.button}>
            SOLICITAR TURNO
          </button>
        </form>
        <img
          src="src/assets/piedras.png"
          alt="img piedras"
          className={styles.imgAppointment}
        />
      </div>
    </>
  );
};

export default Appointments;
