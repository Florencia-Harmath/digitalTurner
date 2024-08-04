import { useSelector, useDispatch } from "react-redux";
import styles from "./Profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de Toastify
import { logout } from "../../redux/authSlice";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user); // Cambia a state.auth
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    toast.info("No hay usuario autenticado, por favor inicie sesión o regístrese.");
    return (
      <div className={styles.contenedor1}>
        <p className={styles.p}>NO HAY USUARIO AUTENTICADO</p>
        <Link to="/login" className={styles.btn}>
          Iniciar sesión
        </Link>
        <Link to="/register" className={styles.btn}>
          Registrarse
        </Link>
      </div>
    );
  }

  console.log("informacion del usuario en profile:", user);

  const formattedBirthdate = new Date(user.birthdate).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleLogout = () => {
    // Despacha la acción de logout
    dispatch(logout());

    // Muestra un mensaje de éxito
    toast.success("Has cerrado sesión exitosamente.");

    // Redirige a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <div className={styles.contenedor}>
      <h2>
        <strong>Bienvenid@:</strong> {user.name} !!
      </h2>
      <h3>
        <strong>Mis datos:</strong>
      </h3>
      <p>
        <strong>Nombre: </strong>
        {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Fecha de nacimiento:</strong> {formattedBirthdate}
      </p>
      <div className={styles.links}>
        <Link to="/profile/edit" className={styles.btn}>
          Editar perfil
        </Link>
        <button onClick={handleLogout} className={styles.btn}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
