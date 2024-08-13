import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { validateLoginForm } from "../../helpers/validate";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice"; 
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value
    });
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
          toast.success("Inicio de sesión exitoso");
          dispatch(loginSuccess(response.data)); 
          setTimeout(() => {
            navigate("/schedule");
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Usuario o contraseña incorrectos");
        });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.p}>
          ¿No tenés cuenta aún? -{" "}
          <Link className={styles.link} to="/">
            Registrate
          </Link>
        </p>
        <form className={styles.form} onSubmit={handleOnSubmit}>
          <h2>LOGIN</h2>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="text"
              value={userData.email}
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              value={userData.password}
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>
          <div className={styles.checkbox}>
            <label>
              Mantener sesión iniciada
              <input
                type="checkbox"
                name="rememberMe"
                checked={userData.rememberMe}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <button className={styles.button} type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
