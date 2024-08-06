// src/components/Appointments/Appointments.jsx
import styles from "./Appointments.module.css";
import { useState } from "react";
import api from "../../helpers/api"; // Importa la instancia configurada de Axios
import { validateAppointment } from "../../helpers/validate.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAppointment } from "../../redux/userSlice.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isSunday } from 'date-fns';

const Appointments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [appointment, setAppointment] = useState({
    date: "",
    time: "",
    serviceName: "",
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
      api
        .post("/appointments/schedule", appointment) 
        .then((response) => {
          const res = response.data;
          toast.success("Turno solicitado con éxito");
          dispatch(addAppointment(res));
          navigate("/turnos");
        })
        .catch((error) => {
          console.error("Error al solicitar turno:", error.message);
          toast.error("Error al solicitar turno. Por favor, inténtalo de nuevo más tarde.");
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

  const filterDate = (date) => {
    return !isSunday(date); 
  };

  return (
    <>
      <h2 className={styles.h2}>SOLICITAR TURNO:</h2>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.divContenedor}>
            <label>FECHA:</label>
            <DatePicker
              selected={appointment.date ? new Date(appointment.date) : null}
              onChange={(date) => {
                setAppointment({ ...appointment, date: date ? date.toISOString().split('T')[0] : '' });
              }}
              minDate={today}
              filterDate={filterDate}
              placeholderText="Seleccionar fecha"
              dateFormat="yyyy/MM/dd"
              className={styles.datePicker}
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

          <button type="submit" className={styles.btn}>
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
