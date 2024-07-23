import styles from "./RegisterForm.module.css";
import axios from "axios";
import { useState } from "react";
import { validateRegisterForm } from "../../helpers/validate.js";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigates = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    birthdate: "",
    dni: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setErrors({ password: "Las contraseñas no coinciden" });
      return;
    }

    const validationErrors = validateRegisterForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      axios
        .post("http://localhost:3000/users/register", form)
        .then((response) => {
          console.log("Datos del usuario registrado", response.data);
          alert("Usuario registrado con exito");
          navigates("/login");
        })
        .catch((error) => {
          console.log(error);

        });
    }
  };
  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleOnSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre completo</label>
            <input
              type="text"
              placeholder="Nombre Completo"
              id="name"
              name="name"
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              onChange={handleChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Fecha de nacimiento</label>
            <input 
            type="date" 
            placeholder="Fecha de nacimiento" 
            id="date" 
            name="birthdate"
            onChange={handleChange}
            />
            {errors.birthdate && <p className={styles.error}>{errors.birthdate}</p>}
          </div>


          <div className={styles.formGroup}>
            <label>Numero de DNI o Cédula</label>
            <input
              type="text"
              placeholder="DNI o Cédula"
              id="dni"
              name="nDni"
              onChange={handleChange}
            />
            {errors.nDni && <p className={styles.error}>{errors.nDni}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Nombre de usuario</label>
            <input
              type="text"
              placeholder="Genere su nombre de usuario"
              id="username"
              name="username"
              onChange={handleChange}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Genere su contraseña, como mínimo 8 caractéres"
              id="password"
              name="password"
              onChange={handleChange}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Confirmar contraseña</label>
            <input
              type="password"
              placeholder="Confirme su contraseña"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword}</p>
            )}
          </div>

          <button className={styles.buttonForm} type="submit">
            REGISTRARSE
          </button>
        </form>

        <img
          className={styles.imgRegister}
          src="src/assets/img-register.png"
          alt="img-home"
        />
      </div>
    </>
  );
};

export default RegisterForm;
