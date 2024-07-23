import { useSelector } from "react-redux";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return (
      <div className={styles.contenedor1}>
        <p className={styles.p}>No hay turnos programados. </p>
        <Link to="/login" className={styles.link}>-iniciar sesión-</Link>
        <Link to="/register" className={styles.link}>-registrarse-</Link>
      </div>
    );
  }

  console.log("informacion del usuario en profile:", user);

  return (
    <div className={styles.contenedor}>
      <h2>
        <strong>Bienvenid@:</strong> {user.user.name} !!
      </h2>
      <h3>
        <strong>Información de usuario:</strong>
      </h3>
      <p>
        <strong>Nombre: </strong>
        {user.user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.user.email}
      </p>
      <p>
        <strong>Fecha de nacimiento:</strong> {user.user.birthdate}
      </p>
      <p>
        <strong>DNI:</strong> {user.user.nDni}
      </p>
      <p>
        <strong>Nombre de usuario: </strong>
        {user.user.username}
      </p>
      <p>
        <strong>id:</strong> {user.user.id}{" "}
      </p>
      ´<Link to="/" className={styles.link}>CERRAR SESION</Link>
    </div>
  );
};

export default UserProfile;
