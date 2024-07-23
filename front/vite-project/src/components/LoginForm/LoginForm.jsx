import { useState } from "react";
import {useNavigate} from "react-router-dom";
import styles from "./LoginForm.module.css";
import { validateLoginForm } from "../../helpers/validate.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { registerSuccess } from "../../redux/userSlice.js";
import  {Link} from "react-router-dom";

const LoginForm = () => {
  const navigates = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const validateErrors = validateLoginForm(userData);
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
    } else {
      axios
        .post("http://localhost:3000/users/login", userData)
        .then((response) => {         
          alert("Inicio de sesión exitoso");
          dispatch(registerSuccess(response.data));
          console.log("data usuario logueado:", response.data);
          navigates("/schedule");
        })
        .catch((error) => {
          console.log(error);
          alert("Usuario no registrado");
          navigates("/register")
        });
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.p}>¿No tenes cuenta aún?  - <Link className={styles.link} to="/register">Registrate</Link></p>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <h2>LOGIN</h2>
        <div className={styles.formGroup}>
          <label>username</label>
          <input
            type="text"
            value={userData.username}
            name="username"
            placeholder="username"
            onChange={handleSubmit}
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>password</label>
          <input
            type="password"
            value={userData.password}
            name="password"
            placeholder="password"
            onChange={handleSubmit}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        <div className={styles.formGroup}>
          <button className={styles.button} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;