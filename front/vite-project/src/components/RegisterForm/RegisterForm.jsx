import styles from "./RegisterForm.module.css";
import axios from "axios";
import { useState } from "react";
import { validateRegisterForm } from "../../helpers/validate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerSuccess } from "../../redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setErrors({ password: "Las contraseñas no coinciden" });
      return;
    }

    const validationErrors = validateRegisterForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/register",
          form
        );

        toast.success("Usuario registrado con éxito");
        dispatch(registerSuccess(response.data));
        navigate("/login");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data?.message ||
            "Hubo un error al registrar el usuario.";
          if (errorMessage) {
            toast.error("El usuario ya se encuentra registrado");
          }
        } else {
          toast.error("Error inesperado al registrar el usuario.");
        }
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleOnSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Nombre Completo"
              id="name"
              name="name"
              onChange={handleChange}
              value={form.name}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onChange={handleChange}
              value={form.email}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              placeholder="Fecha de nacimiento"
              id="birthdate"
              name="birthdate"
              onChange={handleChange}
              value={form.birthdate}
            />
            {errors.birthdate && (
              <p className={styles.error}>{errors.birthdate}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Genere su contraseña, como mínimo 8 caracteres"
              id="password"
              name="password"
              onChange={handleChange}
              value={form.password}
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
              value={form.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword}</p>
            )}
          </div>

          {errors.general && <p className={styles.error}>{errors.general}</p>}

          <button className={styles.buttonForm} type="submit">
            REGISTRARSE
          </button>
        </form>

        <img
          className={styles.imgRegister}
          src="/src/assets/img-register.png"
          alt="img-home"
        />
      </div>
    </>
  );
};

export default RegisterForm;
